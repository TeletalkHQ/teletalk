import type {
  ChatId,
  MessageItem,
  MessageText,
  PrivateChatItem,
  PrivateChats,
  UserId,
} from "teletalk-type-store";

import { StoreSetFn, VoidNoArgsFn, VoidWithArg } from "~/types";

export interface SelectedChatInfo {
  chatId: ChatId;
  userId: UserId;
}

export interface AddMessagePayload {
  chatId: ChatId;
  addedMessage: MessageItem;
}

export interface MessageState {
  privateChats: PrivateChats;
  selectedChatInfo: SelectedChatInfo;
  messageInputTextValue: MessageText;
}

export interface MessageHandlers {
  addMessage: VoidWithArg<AddMessagePayload>;
  addPrivateChat: VoidWithArg<PrivateChatItem>;
  createNewPrivateChat: VoidWithArg<PrivateChatItem>;
  deselectChat: VoidNoArgsFn;
  messageInputOnChange: VoidWithArg<MessageText>;
  setPrivateChats: VoidWithArg<PrivateChats>;
  updateSelectedChatInfo: VoidWithArg<{ chatId: ChatId; userId: UserId }>;
  reset: VoidNoArgsFn;
}

export type MessageSetState = StoreSetFn<MessageState>;

export type MessageStore = MessageHandlers & MessageState;
