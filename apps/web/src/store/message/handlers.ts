import type { PrivateChatItem } from "@repo/types";

import { initialState } from "./initialState";
import { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	setPrivateChats(privateChats) {
		set({
			privateChats,
		});
	},

	deselectChat() {
		set({
			selectedChatInfo: {
				chatId: "",
				userId: "",
			},
		});
	},

	addPrivateChat(p: PrivateChatItem) {
		set((prevState) => ({
			privateChats: [...prevState.privateChats, p],
		}));
	},
	addMessage(payload) {
		set((prevState) => {
			const { chatId, addedMessage } = payload;
			const copyPrivateChats = [...prevState.privateChats];
			const index = copyPrivateChats.findIndex(
				(item) => item.chatId === chatId
			);
			const chat = copyPrivateChats[index];

			if (chat) {
				const newChat = {
					...chat,
					messages: [...chat.messages, addedMessage],
				};

				copyPrivateChats.splice(index, 1, newChat);
				return {
					privateChats: copyPrivateChats,
				};
			} else {
				console.error("private chat not found for update!");
			}

			return {
				privateChats: prevState.privateChats,
			};
		});
	},

	updateSelectedChatInfo(selectedChatInfo) {
		set({ selectedChatInfo });
	},

	createNewPrivateChat(privateChat) {
		set((prevState) => ({
			privateChats: [...prevState.privateChats, privateChat],
		}));
	},

	messageInputOnChange(value) {
		set({
			messageInputTextValue: value,
		});
	},

	reset() {
		set(initialState);
	},
});
