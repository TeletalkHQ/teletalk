import { SocketOnHandler } from "@repo/hl-types";
import { EventName } from "@repo/type-store";

import { services } from "~/services";
import { utils } from "~/utils";

export const updateAvatar: SocketOnHandler<"updateAvatar"> = async (
	socket,
	data
) => {
	const { userId } = await services.user.updateAvatar({
		currentSessionId: socket.sessionId,
		avatarSrc: data.avatarSrc,
	});

	const response = utils.createSuccessResponse("updateAvatar", {
		avatarSrc: data.avatarSrc,
		userId,
	});

	socket.broadcast.emit<EventName>("updateAvatar", response);

	return {
		data: {
			avatarSrc: data.avatarSrc,
			userId,
		},
	};
};
