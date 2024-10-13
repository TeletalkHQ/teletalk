import { errorStore } from "@repo/error-store";
import { SocketMiddleware } from "@repo/socket";
import { SessionId, VerifyIO } from "@repo/types";
import { Socket } from "socket.io";

import { authSessionStore } from "~/classes/AuthSessionStore";

export const verifyVerificationCode: SocketMiddleware<"verify"> = async (
	socket,
	next,
	[_name, data]
) => {
	await tryBlock(socket, data);
	next();
};

const tryBlock = async (socket: Socket, data: VerifyIO["input"]) => {
	const { verificationCode: sentVerificationCode } = data;

	const authSession = await findAuthSession(socket.sessionId);
	const { verificationCode: actualVerificationCode } = authSession;

	if (sentVerificationCode !== actualVerificationCode)
		throw {
			...errorStore.find("VERIFICATION_CODE_INVALID"),
			sentVerificationCode,
		};

	await authSessionStore.update(socket.sessionId, {
		...authSession,
		isVerified: true,
	});
};

const findAuthSession = async (sessionId: SessionId) => {
	const authSession = await authSessionStore.find(sessionId);

	if (!authSession) throw errorStore.find("SESSION_NOT_FOUND");
	return authSession;
};