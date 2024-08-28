import { EventName } from "@repo/schema";
import {
	CustomUse,
	SocketDefaultEvent,
	SocketMiddleware,
	SocketMiddlewareEvent,
	SocketNext,
	SocketResponse,
} from "@repo/types";
import { Socket } from "socket.io";

import { UnknownError } from "~/types";
import { utils } from "~/utils";

export const registerCustomUse = (socket: Socket) => {
	return ((middleware) => {
		socket.use(async (socketMiddlewareEvent: SocketDefaultEvent, next) => {
			try {
				await tryBlock(
					socket,
					next,
					socketMiddlewareEvent as SocketMiddlewareEvent<any>,
					middleware
				);
			} catch (error) {
				catchBlock(
					socket,
					error,
					socketMiddlewareEvent as SocketMiddlewareEvent<any>
				);
			}
		});
	}) as CustomUse<any>;
};

const tryBlock = async <T extends EventName>(
	socket: Socket,
	next: SocketNext,
	socketMiddlewareEvent: SocketMiddlewareEvent<T>,
	middleware: SocketMiddleware<T>
) => {
	await middleware(socket, next, socketMiddlewareEvent);
};

const catchBlock = <T extends EventName>(
	socket: Socket,
	error: UnknownError,
	socketMiddlewareEvent: SocketMiddlewareEvent<T>
) => {
	logger.error(`customUse:catchBlock:${socketMiddlewareEvent[0]}`, error);

	const response: SocketResponse<T> = utils.createFailureResponse(
		socketMiddlewareEvent[0],
		error
	);

	const successResponseCallback = socketMiddlewareEvent[2];

	if (typeof successResponseCallback === "function")
		successResponseCallback(response);

	socket.emit("error", response);
};
