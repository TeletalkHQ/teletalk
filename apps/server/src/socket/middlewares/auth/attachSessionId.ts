import { Socket } from "socket.io";

import { errorStore } from "~/classes/ErrorStore";
import { sessionManager } from "~/classes/SessionManager";
import { SocketMiddleware } from "~/types";

export const attachSessionId: SocketMiddleware = async (
	socket,
	next,
	[_name]
) => {
	try {
		await tryBlock(socket);
		next();
	} catch (error) {
		catchBlock(socket);
	}
};

const tryBlock = async (socket: Socket) => {
	const { session } = socket.handshake.auth;

	const verifiedSession = await sessionManager.verify(session);
	socket.sessionId = sessionManager.getSessionId(verifiedSession);
};

const catchBlock = (socket: Socket) => {
	if (!socket.handshake.auth.session)
		throw errorStore.find("SESSION_NOT_FOUND");

	throw errorStore.find("SESSION_ID_INVALID");
};
