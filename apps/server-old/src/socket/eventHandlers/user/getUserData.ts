import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";

export const getUserData: SocketOnHandler<"getUserData"> = async (socket) => {
	const {
		user: { sessions, ...rest },
	} = await services.user.findBySessionId({
		currentSessionId: socket.sessionId,
	});

	const { contacts } = await services.user.getContacts({
		currentSessionId: socket.sessionId,
	});

	return {
		data: {
			user: {
				...rest,
				contacts,
			},
		},
	};
};
