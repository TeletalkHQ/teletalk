import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";

export const addBlock: SocketOnHandler<"addBlock"> = async (socket, data) => {
	await services.user.addBlock({
		targetUserId: data.userId,
		currentSessionId: socket.sessionId,
	});

	return {
		data: {
			blockedUser: {
				userId: data.userId,
			},
		},
	};
};
