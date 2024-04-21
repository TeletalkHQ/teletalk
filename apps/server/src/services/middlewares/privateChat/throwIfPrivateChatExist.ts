import { errorStore } from "@repo/error-store";
import { HydratedPrivateChat } from "@repo/model";
import { ChatId, UserId } from "@repo/type-store";

import { coreServices } from "~/services/privateChat/core";
import { ServiceMiddleware } from "~/types";

export const throwIfPrivateChatExist: ServiceMiddleware<
	{
		currentParticipantId?: UserId;
		targetParticipantId?: UserId;
		chatId?: ChatId;
	},
	void
> = async (data) => {
	let p: HydratedPrivateChat | null;

	if (data.chatId) {
		p = await coreServices.find({
			chatId: data.chatId,
		});
	} else if (data.currentParticipantId && data.targetParticipantId) {
		p = await coreServices.find({
			["participants.participantId"]: {
				$all: [data.currentParticipantId, data.targetParticipantId],
			},
		});
	}

	if (p!) throw errorStore.find("PRIVATE_CHAT_EXIST");
};
