import { emptyMaker } from "@repo/classes";
import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";

export const addContactWithUserId: SocketOnHandler<
	"addContactWithUserId"
> = async (socket, data) => {
	const {
		newContact: { isCellphoneAccessible, ...rest },
	} = await services.user.addContactWithUserId({
		currentSessionId: socket.sessionId,
		fullName: data,
		targetUserId: data.userId,
	});

	return {
		data: {
			newContact: {
				...rest,
				...emptyMaker.emptyCellphone(),
			},
		},
	};
};
