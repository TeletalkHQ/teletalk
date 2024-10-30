"use client";

import { logger } from "@repo/logger";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import useWebSocketPkg, { Options, ReadyState } from "react-use-websocket";
import z, { ZodSchema } from "zod";

import { useConfigs } from "../../utils";

export type Command<C extends ZodSchema> = {
	command: "execute" | "auth" | "ping";
	data: C;
} | null;

type InitialArg<Input extends ZodSchema> = {
	initialCommand?: Command<z.infer<Input>> | undefined;
	isEnabled?: boolean;
	queryKey?: Array<string | number | boolean | undefined>;
};

export type WebSocketArg<
	T extends string,
	Input extends ZodSchema,
	Output extends ZodSchema,
> = InitialArg<Input> & {
	defaultBaseUrl?: string;
	eventName: string;
	eventShortName: T;

	initialData: undefined | z.infer<Output>;
	io: {
		input: Input;
		output: Output;
	};
	options?: Options;
	updater?: Array<string | number | boolean | undefined>;
};

const heartbeat = {
	message: JSON.stringify({
		command: "ping",
	}),
	returnMessage: JSON.stringify({
		message: "pong",
		data: null,
	}),
	interval: 40 * 1000,
};

export const createWebSocketHook =
	<T extends string, Input extends ZodSchema, Output extends ZodSchema>(
		arg: WebSocketArg<T, Input, Output>
	) =>
	(initialArg?: InitialArg<Input>) =>
		useWebSocket({ ...arg, ...initialArg });

export type GetWSArg<T extends typeof useWebSocket> = Parameters<T>["0"];

export function useWebSocket<
	T extends string,
	Input extends ZodSchema,
	Output extends ZodSchema,
>({
	defaultBaseUrl,
	eventName,
	initialCommand,
	initialData,
	io,
	isEnabled = true,
	options,
	queryKey,
}: WebSocketArg<T, Input, Output>) {
	const [data, setData] = useState<z.infer<Output> | undefined>(undefined);
	const [error, setError] = useState<string | null>(null);
	const [command, setCommand] = useState<Command<z.infer<Input>>>(null);

	const { getApiWSBaseUrl } = useConfigs();

	const socketUrl = getSocketURL(
		eventName,
		defaultBaseUrl || getApiWSBaseUrl()
	);
	const { sendJsonMessage, readyState } = useWebSocketPkg(
		isEnabled ? socketUrl : null,
		{
			...options,
			onError: (event) => {
				setError(`WebSocket error: ${event}`);
				options?.onError?.(event);
			},
			onMessage: (event) => {
				handleMessage(event);
			},
			heartbeat,
		}
	);

	const queryClient = useQueryClient();

	const isConnected = readyState === ReadyState.OPEN;

	useEffect(() => {
		if (isConnected && command && isEnabled) sendJsonMessage(command);

		return () => {};
	}, [isConnected, command, sendJsonMessage, isEnabled]);

	const validateInput = useCallback(
		(input: z.infer<Input>) => {
			const result = io.input.safeParse(input);
			if (!result.success) {
				setError("Invalid command format");
				return false;
			}
			return true;
		},
		[io.input]
	);

	const handleSetCommand = useCallback(
		(command: Command<z.infer<Input>>) => {
			if (validateInput(command?.data)) {
				setCommand(command);
			}
		},
		[validateInput, setCommand]
	);

	useEffect(() => {
		if (initialCommand) {
			handleSetCommand(initialCommand);
		}
	}, [handleSetCommand, initialCommand]);

	const handleMessage = (event: MessageEvent) => {
		try {
			const parsedData = JSON.parse(event.data);

			if (parsedData.message === "pong") return;
			else {
				io.output.parse(parsedData.data);
				setData(parsedData.data);
				if (queryKey) queryClient.setQueryData(queryKey, parsedData.data);
			}

			options?.onMessage?.(event);
		} catch (err) {
			setError("Failed to parse incoming WebSocket data");
			logger.error(err);
		}
	};

	return {
		data,
		error,
		handleSetCommand,
		initialData,
		isConnected,
		readyState,
		sendJsonMessage,
		setCommand,
	};
}

const getSocketURL = (eventName: string, baseUrl: string | undefined) =>
	`${baseUrl}${eventName ? "/" + eventName : ""}`;
