import { SocketOnHandler } from "@repo/hl-types";
import { EventName } from "@repo/type-store";

import { utils } from "~/utils";

export const ping: SocketOnHandler<"ping"> = (socket) => {
	const data = {
		pong: `ping request from socketId:${socket.id}`,
	};

	socket.emit<EventName>("pong", utils.createSuccessResponse("pong", data));

	return {
		data,
		options: {
			shouldEmitToUserRooms: false,
		},
	};
};
