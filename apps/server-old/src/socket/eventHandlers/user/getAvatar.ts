import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";

export const getAvatar: SocketOnHandler<"getAvatar"> = async (
	_socket,
	data
) => {
	const { avatarSrc } = await services.user.getAvatar({
		targetUserId: data.userId,
	});

	return {
		data: {
			avatarSrc,
			userId: data.userId,
		},
	};
};
