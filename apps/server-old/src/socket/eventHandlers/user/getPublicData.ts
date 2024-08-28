import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";

export const getPublicData: SocketOnHandler<"getPublicData"> = async (
	_socket,
	data
) => {
	const { userId } = data;

	const { publicData } = await services.user.getPublicData({
		targetUserId: userId,
	});

	return {
		data: {
			publicData,
		},
	};
};
