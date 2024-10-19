import { EventName } from "@repo/schema";
import { SocketOnHandler } from "@repo/socket";

import { clientStatusStore } from "~/classes/ClientStatusStore";
import { services } from "~/services";
import { utils } from "~/utils";

export const join: SocketOnHandler<"join"> = async (socket) => {
	const {
		user: { userId },
	} = await services.user.findBySessionId({
		currentSessionId: socket.sessionId,
	});
	socket.join("public");
	socket.join(userId);
	clientStatusStore.incConnection(userId);

	const responseToGetClientStatus = utils.createSuccessResponse(
		"getClientStatus",
		{
			isOnline: true,
			userId,
		}
	);

	socket.broadcast.emit<EventName>(
		responseToGetClientStatus.eventName,
		responseToGetClientStatus
	);

	return {
		data: {},
	};
};
