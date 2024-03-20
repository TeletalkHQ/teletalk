import type { ChatId, UserId } from "teletalk-type-store";

import { VoidWithArg } from "~/types";

export type HandleChatListItemClick = VoidWithArg<{
  userId: UserId;
  chatId: ChatId;
}>;
