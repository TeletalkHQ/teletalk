import { useCallback, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { ZodSchema, z } from "zod";

import { EmitterHandler, EmitterParameters } from "./types";
import { useSocket } from "./useSocket";

export const useEmitter = <
	T extends string,
	I extends ZodSchema,
	O extends ZodSchema,
>({
	baseUrl,
	eventName,
	io,
	namespace,
	options,
}: EmitterParameters<T, I, O>) => {
	const { socket } = useSocket({ baseUrl, namespace, options });

	const queue = useRef<{ eventName: string; data: z.infer<I> }[]>([]);

	const _emit = useCallback(
		async (eventName: string, socket: Socket, data: z.infer<I>) => {
			const parsedData = data || (await io.input.parseAsync(data));

			const response = (await new Promise((resolve, _reject) => {
				socket.emit(eventName, { data: parsedData }, resolve);
			})) as { data: z.infer<O> };

			return response.data || io.output.parse(response.data);
		},
		[io.input, io.output]
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

				return {
					data: undefined,
				};
			}

			return _emit(eventName, socket, data);
		},
		[_emit, eventName, socket]
	);

	return {
		emitter,
	};
};
