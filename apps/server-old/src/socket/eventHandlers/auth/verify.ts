import { extractor } from "@repo/classes";
import { SocketOnHandler } from "@repo/socket";

import { authSessionStore } from "~/classes/AuthSessionStore";
import { sessionManager } from "~/classes/SessionManager";
import { services } from "~/services";

export const verify: SocketOnHandler<"verify"> = async (socket) => {
	const authSession = await authSessionStore.find(socket.sessionId);

	if (!authSession) throw errorStore.find("SESSION_NOT_FOUND");

	const { isUserExist, userId } = await services.user.isUserExist({
		cellphone: extractor.cellphone(authSession),
	});

	if (isUserExist) {
		const sessionId = sessionManager.generateSessionId();
		const session = await sessionManager.sign(sessionId);

		await services.user.addSession({
			currentUserId: userId!,
			sessionId,
		});

		authSessionStore.remove(socket.sessionId);

		return {
			data: {
				isNewUser: false,
				// TODO: Rename to session
				sessionId: session,
			},
		};
	}

	return {
		data: {
			isNewUser: true,
			sessionId: "",
		},
		options: {
			shouldEmitToUserRooms: false,
		},
	};
};
