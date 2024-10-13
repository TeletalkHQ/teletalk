import { errorStore } from "@repo/error-store";
import { PrivateChatItem } from "@repo/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";

import { coreServices } from "../core";

export const findByChatId = serviceBuilder
	.create<
		{
			chatId: string;
		},
		PrivateChatItem
	>()
	.setBody((data) => {
		const item = coreServices.find({ chatId: data.chatId });
		if (!item) throw errorStore.find("PRIVATE_CHAT_NOT_EXIST");
		return item as PrivateChatItem;
	})
	.build();