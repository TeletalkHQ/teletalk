import { randomMaker } from "@repo/classes";
import { extractor } from "@repo/classes";
import { userUtils } from "@repo/classes";
import { errorStore } from "@repo/error-store";
import { SocketOnHandler } from "@repo/hl-types";
import { models } from "@repo/model";

import { authSessionStore } from "~/classes/AuthSessionStore";
import { sessionManager } from "~/classes/SessionManager";
import { services } from "~/services";
import { StoredAuthSession } from "~/types";

export const createNewUser: SocketOnHandler<"createNewUser"> = async (
	socket,
	{ firstName, lastName }
) => {
	const authSession = await authSessionStore.find(socket.sessionId);
	if (!authSession) throw errorStore.find("SESSION_NOT_FOUND");
	checkClientVerification(authSession);

	const cellphone = extractor.cellphone(authSession);
	const userId = getRandomId();
	const sessionId = sessionManager.generateSessionId();
	const session = await sessionManager.sign(sessionId);

	await services.user.createNewUser({
		...userUtils.getDBDefaultUserData(),
		...cellphone,
		firstName,
		lastName,
		createdAt: Date.now(),
		userId,
		sessions: [{ sessionId }],
		status: {
			isActive: true,
		},
	});

	await authSessionStore.remove(socket.sessionId);

	return {
		data: {
			session,
		},
		options: {
			shouldEmitToUserRooms: false,
		},
	};
};

const checkClientVerification = (authSession: StoredAuthSession) => {
	if (!authSession.isVerified)
		throw {
			...errorStore.find("SESSION_NOT_VERIFIED"),
			createNewUser: "failed",
		};
};

const getRandomId = () => randomMaker.id(models.native.userId.max);
