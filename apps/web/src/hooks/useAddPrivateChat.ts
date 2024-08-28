import type { ChatId } from "@repo/types";

import { useMessageStore } from "~/store";

import { useEmitter } from "./useEmitter";

export const useAddPrivateChat = () => {
	const messageStore = useMessageStore();
	const { handler: getPrivateChatHandler } = useEmitter("getPrivateChat");

	const handler = (chatId: ChatId) => {
		return getPrivateChatHandler.emitFull({ chatId }, ({ data }) => {
			messageStore.addPrivateChat(data.privateChat);
		});
	};

	return {
		handler,
	};
};
