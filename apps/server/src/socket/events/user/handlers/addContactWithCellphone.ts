import { extractor } from "@repo/classes";
import { SocketOnHandler } from "@repo/hl-types";
import { ContactItem } from "@repo/type-store";

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
