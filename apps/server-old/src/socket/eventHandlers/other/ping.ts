import { EventName } from "@repo/schema";
import { SocketOnHandler } from "@repo/socket";

import { utils } from "~/utils";

export const ping: SocketOnHandler<"ping"> = (socket) => {
	const data = {
		pong: `ping request from socketId:${socket.id}`,
	};

	socket.emit<EventName>("ping", utils.createSuccessResponse("ping", data));

	return {
		data,
		options: {
			shouldEmitToUserRooms: false,
		},
	};
};
