import { extractor } from "@repo/classes";
import { UpdateContactIO } from "@repo/type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const updateContact: SocketOnHandler<UpdateContactIO> = async (
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
