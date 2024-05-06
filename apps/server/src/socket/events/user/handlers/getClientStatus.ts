import { SocketOnHandler } from "@repo/hl-types";

import { clientStatusStore } from "~/classes/ClientStatusStore";

export const getClientStatus: SocketOnHandler<"getClientStatus"> = async (
	_socket,
	data
) => {
	return {
		data: {
			isOnline: await clientStatusStore.isOnline(data.userId),
			userId: data.userId,
		},
	};
};
