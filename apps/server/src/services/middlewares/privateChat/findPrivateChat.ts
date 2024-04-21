import { errorStore } from "@repo/error-store";
import { ChatId, HydratedPrivateChat, HydratedUser, UserId } from "@repo/model";

import { coreServices } from "~/services/privateChat/core";
import { ServiceMiddleware } from "~/types";

export const findPrivateChat: ServiceMiddleware<
	{
		currentParticipant: HydratedUser;
		targetParticipantId?: UserId;
		chatId: ChatId;
	},
	{
		privateChat: HydratedPrivateChat;
	}
> = async (data) => {
	let p: HydratedPrivateChat | null;

	if (data.chatId) {
		p = await coreServices.find({
			chatId: data.chatId,
		});
	} else if (data.currentParticipant.userId && data.targetParticipantId) {
		p = await coreServices.find({
			"participants.participantId": {
				$all: [data.currentParticipant.userId, data.targetParticipantId],
			},
		});
	}

	if (!p!) throw errorStore.find("PRIVATE_CHAT_NOT_EXIST");

	return {
		privateChat: p,
	};
};
