import { randomMaker } from "@repo/classes";
import { HydratedUser, models } from "@repo/model";
import { UserId } from "@repo/types";

import { coreServices } from "~/services/privateChat/core";
import { ServiceMiddleware } from "~/types";

export const createPrivateChatIfNotExist: ServiceMiddleware<
	{
		currentParticipant: HydratedUser;
		targetParticipantId: UserId;
	},
	void
> = async (data) => {
	const p = await coreServices.find({
		"participants.participantId": {
			$all: [data.currentParticipant.userId, data.targetParticipantId],
		},
	});

	if (!p) {
		await coreServices.create({
			chatId: randomMaker.id(models.native.chatId.max),
			createdAt: Date.now(),
			currentParticipantId: data.currentParticipant.userId,
			targetParticipantId: data.targetParticipantId,
		});
	}
};
