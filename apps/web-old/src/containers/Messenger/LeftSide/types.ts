import type { ChatId, UserId, VoidWithArg } from "@repo/types";

export type HandleChatListItemClick = VoidWithArg<{
	userId: UserId;
	chatId: ChatId;
}>;
