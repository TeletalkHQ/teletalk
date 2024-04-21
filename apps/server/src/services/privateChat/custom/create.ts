import { randomMaker } from "@repo/classes";
import { models } from "@repo/model";
import { UserId } from "@repo/type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";

import { coreServices } from "../core";

export const create = serviceBuilder
	.create<
		{
			currentParticipantId: UserId;
			targetParticipantId: UserId;
		},
		void
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.throwIfPrivateChatExist)
	.setBody(async (data) => {
		await coreServices.create({
			chatId: randomMaker.id(models.native.chatId.max),
			createdAt: Date.now(),
			currentParticipantId: data.currentParticipantId,
			targetParticipantId: data.targetParticipantId,
		});
	})
	.build();
