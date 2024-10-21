import type { ChatId } from "@repo/types";

import { useMessageStore } from "~/store";

import { useEmitter } from "./useEmitter";

export const useAddPrivateChat = () => {
	const messageStore = useMessageStore();
	const { handler: getPrivateChatHandler } = useEmitter("getOnePrivateChat");

	const handler = (chatId: ChatId) => {
		return getPrivateChatHandler.send({ chatId }, ({ data }) => {
			messageStore.addPrivateChat(data.privateChat);
		});
	};

	return {
		handler,
	};
};
