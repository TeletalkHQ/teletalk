import { Socket } from "socket.io";

import {
	CustomUse,
	SocketDefaultEvent,
	SocketMiddleware,
	SocketMiddlewareEvent,
	SocketNext,
	SocketResponse,
	UnknownError,
} from "~/types";
import { utils } from "~/utils";

export const registerCustomUse = (socket: Socket) => {
	return ((middleware) => {
		socket.use(async (socketMiddlewareEvent: SocketDefaultEvent, next) => {
			try {
				await tryBlock(
					socket,
					next,
					socketMiddlewareEvent as SocketMiddlewareEvent,
					middleware
				);
			} catch (error) {
				catchBlock(
					socket,
					error,
					socketMiddlewareEvent as SocketMiddlewareEvent
				);
			}
		});
	}) as CustomUse;
};

const tryBlock = async (
	socket: Socket,
	next: SocketNext,
	socketMiddlewareEvent: SocketMiddlewareEvent,
	middleware: SocketMiddleware
) => {
	await middleware(socket, next, socketMiddlewareEvent);
};

const catchBlock = (
	socket: Socket,
	error: UnknownError,
	socketMiddlewareEvent: SocketMiddlewareEvent
) => {
	logger.error(`customUse:catchBlock:${socketMiddlewareEvent[0]}`, error);

	const response: SocketResponse = utils.createFailureResponse(
		socketMiddlewareEvent[0],
		error
	);

	const successResponseCallback = socketMiddlewareEvent[2];

	if (typeof successResponseCallback === "function")
		successResponseCallback(response);

	socket.emit("error", response);
};
