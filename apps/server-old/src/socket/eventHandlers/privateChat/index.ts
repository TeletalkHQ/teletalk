import { getChatInfo } from "./getChatInfo";
import { getOnePrivateChat } from "./getOnePrivateChat";
import { getPrivateChats } from "./getPrivateChats";
import { sendMessage } from "./sendMessage";

export const privateChatHandlers = {
	getChatInfo,
	getOnePrivateChat,
	getPrivateChats,
	sendMessage,
};
