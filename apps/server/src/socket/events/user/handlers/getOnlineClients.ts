import { SocketOnHandler } from "@repo/hl-types";

import { clientStatusStore } from "~/classes/ClientStatusStore";
import { services } from "~/services";

export const getOnlineClients: SocketOnHandler<"getOnlineClients"> = async (
	socket
) => {
	const {
		user: { userId },
	} = await services.user.findBySessionId({
		currentSessionId: socket.sessionId,
	});

	const onlineClients = (await clientStatusStore.getOnlineClients()).filter(
		(i) => i.userId !== userId
	);

	return {
		data: {
			onlineClients,
		},
	};
};
