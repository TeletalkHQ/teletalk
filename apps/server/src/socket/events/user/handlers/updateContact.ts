import { extractor } from "@repo/classes";
import { SocketOnHandler } from "@repo/hl-types";

import { services } from "~/services";

export const updateContact: SocketOnHandler<"updateContact"> = async (
	socket,
	data
) => {
	await services.user.updateContact({
		currentSessionId: socket.sessionId,
		editValues: extractor.fullName(data),
		targetUserId: data.userId,
	});

	return {
		data: {
			updatedContact: data,
		},
	};
};
