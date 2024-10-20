import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";

export const getUserPublicInfo: SocketOnHandler<"getUserPublicInfo"> = async (
	_socket,
	data
) => {
	const { userId } = data;

	const { publicInfo } = await services.user.getUserPublicInfo({
		targetUserId: userId,
	});

	return {
		data: {
			publicInfo,
		},
	};
};
