import { State } from "./types";

export const initialState: State = {
	messageInputTextValue: "",
	privateChats: [],
	selectedChatInfo: {
		chatId: "",
		userId: "",
	},
};
