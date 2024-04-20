import type { ChatId, UserId } from "@repo/type-store";

import { VoidWithArg } from "~/types";

export type HandleChatListItemClick = VoidWithArg<{
	userId: UserId;
	chatId: ChatId;
}>;
