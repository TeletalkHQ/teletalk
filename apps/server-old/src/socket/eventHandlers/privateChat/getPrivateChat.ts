import { SocketOnHandler } from "@repo/socket";

import { services } from "~/services";

export const getPrivateChat: SocketOnHandler<"getPrivateChat"> = async (
	_socket,
	data
) => {
	const privateChat = await services.privateChat.findByChatId({
		chatId: data.chatId,
	});

	return { data: { privateChat: JSON.parse(JSON.stringify(privateChat)) } };
};
