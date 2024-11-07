"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ZodSchema } from "zod";

import { IoContext } from "../providers";
import { BaseArg, EmitResponse, EmitterHandler, _EmitFnArg } from "./types";
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

	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	const { socket } = useSocket({ baseUrl, namespace, options });

	const { inputTransformer } = useContext(IoContext);

	const queue = useRef<Omit<_EmitFnArg<I, O>, "socket">[]>([]);

	const _emit = useCallback(
		async ({ data, eventName, socket, options }: _EmitFnArg<I, O>) => {
			try {
				setIsLoading(true);
				setHasError(false);

				const parsedData = await io.input.parseAsync(inputTransformer(data));

				const response = (await new Promise((resolve, _reject) => {
					socket.emit(eventName, { data: parsedData }, resolve);
				})) as EmitResponse<O>;

				await io.output.parseAsync(response.data);

				setData(response);

				options?.onSuccess?.(response);

				return {
					...response,
					data: response.data,
				};
			} catch (error) {
				console.log("emit error:", error);
				setHasError(true);
				options?.onError?.([error]);

				return initialData;
			} finally {
				setIsLoading(false);
			}
		},
		[initialData, inputTransformer, io.input, io.output]
	);

	useEffect(() => {
		if (!socket || queue.current.length === 0) return;

		queue.current.forEach(({ eventName, data }) =>
			_emit({ eventName, socket, data })
		);

		queue.current = [];
	}, [_emit, socket]);

	const emitter: EmitterHandler<I, O> = useCallback(
		async ({ data, options }) => {
			if (!socket) {
				queue.current.push({
					data,
					eventName,
					options,
				});

				return initialData;
			}

			return _emit({ eventName, socket, data, options });
		},
		[_emit, eventName, initialData, socket]
	);

	return {
		data,
		emitter,
		hasError,
		initialData,
		isLoading,
		socket,
	};
};
