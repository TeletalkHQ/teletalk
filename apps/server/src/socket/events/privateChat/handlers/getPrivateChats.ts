import { SocketOnHandler } from "@repo/hl-types";

import { services } from "~/services";

export const getPrivateChats: SocketOnHandler<"getPrivateChats"> = async (
	socket
) => {
	const { privateChats } = await services.privateChat.findManyByParticipantId({
		currentSessionId: socket.sessionId,
	});

	return {
		data: {
			privateChats,
		},
	};
};
