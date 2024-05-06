import type { ChatId, UserId, VoidWithArg } from "@repo/type-store";

export type HandleChatListItemClick = VoidWithArg<{
	userId: UserId;
	chatId: ChatId;
}>;
