"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { ZodSchema, z } from "zod";

import { IoContext } from "../providers";
import { BaseArg, EmitResponse, EmitterHandler } from "./types";
import { useSocket } from "./useSocket";

export interface UseEmitterParameters<
	T extends string,
	I extends ZodSchema,
	O extends ZodSchema,
> extends BaseArg {
	eventName: T;
	initialData: EmitResponse<O>;
	io: {
		input: I;
		output: O;
	};
}

export const useEmitter = <
	T extends string,
	I extends ZodSchema,
	O extends ZodSchema,
>({
	baseUrl,
	eventName,
	initialData,
	io,
	namespace,
	options,
}: UseEmitterParameters<T, I, O>) => {
	const [data, setData] = useState<EmitResponse<O>>(initialData);

	const { socket } = useSocket({ baseUrl, namespace, options });

	const { inputTransformer } = useContext(IoContext);

	const queue = useRef<{ eventName: string; data: z.infer<I> }[]>([]);

	const _emit = useCallback(
		async (eventName: string, socket: Socket, data: z.infer<I>) => {
			const parsedData = await io.input.parseAsync(inputTransformer(data));

			const response = (await new Promise((resolve, _reject) => {
				socket.emit(eventName, { data: parsedData }, resolve);
			})) as EmitResponse<O>;

			await io.output.parseAsync(response.data);

			setData({
				...response,
				data: response.data,
			});

			return {
				...response,
				data: response.data,
			};
		},
		[inputTransformer, io.input, io.output]
	);

	useEffect(() => {
		if (!socket || queue.current.length === 0) return;

		queue.current.forEach(({ eventName, data }) =>
			_emit(eventName, socket, data)
		);

		queue.current = [];
	}, [_emit, socket]);

	const emitter: EmitterHandler<I, O> = useCallback(
		async ({ data }) => {
			if (!socket) {
				queue.current.push({
					data,
					eventName,
				});

				return initialData;
			}

			return _emit(eventName, socket, data);
		},
		[_emit, eventName, initialData, socket]
	);

	return {
		data,
		emitter,
		initialData,
		socket,
	};
};
