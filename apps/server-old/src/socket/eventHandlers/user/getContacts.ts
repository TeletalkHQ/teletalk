import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";

export const getContacts: SocketOnHandler<"getContacts"> = async (socket) => {
	const { contacts } = await services.user.getContacts({
		currentSessionId: socket.sessionId,
	});

	return {
		data: { contacts },
	};
};
