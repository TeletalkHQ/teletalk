import { extractor } from "@repo/classes";
import { errorStore } from "@repo/error-store";
import { SocketOnHandler } from "@repo/hl-types";

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
				newUser: false,
				session,
			},
		};
	}

	return {
		data: {
			newUser: true,
			session: "",
		},
		options: {
			shouldEmitToUserRooms: false,
		},
	};
};
