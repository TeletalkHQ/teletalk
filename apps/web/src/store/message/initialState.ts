import { MessageState } from "~/types";

export const initialState: MessageState = {
  messageInputTextValue: "",
  privateChats: [],
  selectedChatInfo: {
    chatId: "",
    userId: "",
  },
};
