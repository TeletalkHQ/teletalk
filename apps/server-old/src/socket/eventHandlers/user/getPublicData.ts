import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";

export const getPublicInfo: SocketOnHandler<"getPublicInfo"> = async (
	_socket,
	data
) => {
	const { userId } = data;

	const { publicInfo } = await services.user.getPublicInfo({
		targetUserId: userId,
	});

	return {
		data: {
			publicInfo,
		},
	};
};
