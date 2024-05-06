import { SocketOnHandler } from "@repo/hl-types";

import { authSessionStore } from "~/classes/AuthSessionStore";
import { services } from "~/services";

export const logout: SocketOnHandler<"logout"> = async (socket) => {
	await services.user.logout({
		currentSessionId: socket.sessionId,
	});

	await authSessionStore.remove(socket.sessionId);

	return {
		data: undefined,
		options: {
			cbAfterEmit: () => {
				socket.rooms.clear();
				socket.disconnect();
			},
			shouldEmitReturnValue: false,
			shouldEmitToUserRooms: false,
		},
	};
};
