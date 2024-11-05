import { useCallback, useContext, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { ZodSchema, z } from "zod";

import { IoContext } from "../providers";
import { EmitResponse, EmitterHandler, EmitterParameters } from "./types";
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

	const { inputTransformer } = useContext(IoContext);

	const queue = useRef<{ eventName: string; data: z.infer<I> }[]>([]);

	const _emit = useCallback(
		async (eventName: string, socket: Socket, data: z.infer<I>) => {
			const parsedData = await io.input.parseAsync(inputTransformer(data));

			const response = (await new Promise((resolve, _reject) => {
				socket.emit(eventName, { data: parsedData }, resolve);
			})) as EmitResponse<O>;

			await io.output.parseAsync(response.data);

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

				return {
					data: undefined,
					errors: [],
					ok: false,
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
