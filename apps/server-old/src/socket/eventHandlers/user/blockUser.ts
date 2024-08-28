import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";

export const blockUser: SocketOnHandler<"blockUser"> = async (socket, data) => {
	await services.user.blockUser({
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
