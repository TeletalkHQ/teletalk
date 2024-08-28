import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";

export const removeContact: SocketOnHandler<"removeContact"> = async (
	socket,
	data
) => {
	await services.user.removeContact({
		currentSessionId: socket.sessionId,
		targetUserId: data.userId,
	});

	return {
		data: {
			removedContact: {
				userId: data.userId,
			},
		},
	};
};
