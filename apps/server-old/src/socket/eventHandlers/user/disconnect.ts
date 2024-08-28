import { EventName } from "@repo/schema";
import { SocketOnHandler } from "@repo/socket";

import { clientStatusStore } from "~/classes/ClientStatusStore";
import { services } from "~/services";
import { utils } from "~/utils";

export const disconnect: SocketOnHandler<"disconnect"> = async (socket) => {
	const notAllowedEvents: EventName[] = ["signIn", "createNewUser", "verify"];

	if (socket.sessionId && !notAllowedEvents.includes(socket.eventName)) {
		const {
			user: { userId },
		} = await services.user.findBySessionId({
			currentSessionId: socket.sessionId,
		});

		await clientStatusStore.decConnection(userId);

		const response = utils.createSuccessResponse("getClientStatus", {
			isOnline: await clientStatusStore.isOnline(userId),
			userId,
		});

		socket.broadcast.emit<EventName>(response.eventName, response);
	}

	return {
		data: undefined,
		options: {
			shouldEmitReturnValue: false,
			shouldEmitToUserRooms: false,
			shouldCallResponseCallback: false,
		},
	};
};
