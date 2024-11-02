import type {
	ChatId,
	MessageItem,
	MessageText,
	PrivateChatItem,
	PrivateChats,
	UserId,
	VoidNoArgs,
	VoidWithArg,
} from "@repo/types";

import { StoreSetFn } from "../utils";

export interface SelectedChatInfo {
	chatId: ChatId;
	userId: UserId;
}

export interface AddMessagePayload {
	chatId: ChatId;
	addedMessage: MessageItem;
}

export interface State {
	privateChats: PrivateChats;
	selectedChatInfo: SelectedChatInfo;
	messageInputTextValue: MessageText;
}

export interface Handlers {
	addMessage: VoidWithArg<AddMessagePayload>;
	addPrivateChat: VoidWithArg<PrivateChatItem>;
	createNewPrivateChat: VoidWithArg<PrivateChatItem>;
	deselectChat: VoidNoArgs;
	messageInputOnChange: VoidWithArg<MessageText>;
	setPrivateChats: VoidWithArg<PrivateChats>;
	updateSelectedChatInfo: VoidWithArg<{ chatId: ChatId; userId: UserId }>;
	reset: VoidNoArgs;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
