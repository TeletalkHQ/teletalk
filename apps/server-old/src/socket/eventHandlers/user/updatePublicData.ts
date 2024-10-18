import { EventName } from "@repo/schema";
import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";
import { utils } from "~/utils";

export const updatePublicInfo: SocketOnHandler<"updatePublicInfo"> = async (
	socket,
	data
) => {
	const { bio, firstName, lastName, username } = data;

	const result = await services.user.updatePublicInfo({
		currentSessionId: socket.sessionId,
		updateProperties: {
			bio,
			firstName,
			lastName,
			username,
		},
	});

	const returnData = {
		userPublicData: {
			...data,
			userId: result.userId,
		},
	};

	//TODO: Change to public:id
	socket
		.to("public")
		.emit<EventName>(
			"updatePublicInfo",
			utils.createSuccessResponse("updatePublicInfo", returnData)
		);

	return {
		data: returnData,
	};
};
