import { HydratedPrivateChat, models } from "@repo/model";
import { CreatedAt } from "@repo/types";

import { PrivateChatService } from "~/types";

export const create: PrivateChatService<
	{
		chatId: string;
		createdAt: CreatedAt;
		currentParticipantId: string;
		targetParticipantId: string;
	},
	HydratedPrivateChat
> = (data) => {
	return models.database.PrivateChat.create({
		chatId: data.chatId,
		createdAt: data.createdAt,
		participants: [
			{
				participantId: data.currentParticipantId,
			},
			{
				participantId: data.targetParticipantId,
			},
		],
	});
};
