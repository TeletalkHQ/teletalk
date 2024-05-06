import { SocketOnHandler } from "@repo/hl-types";

import { services } from "~/services";

export const removeBlock: SocketOnHandler<"removeBlock"> = async (
	socket,
	data
) => {
	await services.user.removeBlock({
		currentSessionId: socket.sessionId,
		targetUserId: data.userId,
	});

	return {
		data: {
			removedBlock: data,
		},
	};
};
