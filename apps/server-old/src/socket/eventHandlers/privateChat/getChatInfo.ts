import { errorStore } from "@repo/error-store";
import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";

export const getChatInfo: SocketOnHandler<"getChatInfo"> = async (
	_socket,
	data
) => {
	const privateChat = await services.privateChat.findByChatId({
		chatId: data.chatId,
	});

	if (!privateChat) throw errorStore.find("PRIVATE_CHAT_NOT_EXIST");

	const { chatId, createdAt, participants } = privateChat;

	return {
		data: {
			chatInfo: {
				chatId,
				createdAt,
				participants,
			},
		},
	};
};
