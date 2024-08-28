import { extractor } from "@repo/classes";
import { SocketOnHandler } from "@repo/socket";
import { ContactItem } from "@repo/types";

import { services } from "~/services";

export const addContactWithCellphone: SocketOnHandler<
	"addContactWithCellphone"
> = async (socket, data) => {
	const {
		newContact: { isCellphoneAccessible, ...rest },
	} = await services.user.addContactWithCellphone({
		currentSessionId: socket.sessionId,
		addingContact: data,
		targetUserCellphone: extractor.unknownCellphone(data),
	});

	return {
		data: {
			newContact: {
				...rest,
				...extractor.unknownCellphone(data),
			} as ContactItem,
		},
	};
};
