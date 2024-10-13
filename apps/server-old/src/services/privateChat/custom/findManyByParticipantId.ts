import { HydratedUser } from "@repo/model";
import { PrivateChats } from "@repo/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";

import { coreServices } from "../core";

export const findManyByParticipantId = serviceBuilder
	.create<
		{
			currentSessionId: string;
		},
		{
			privateChats: PrivateChats;
		},
		{
			currentParticipant: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentParticipant)
	.setBody(async (data, options, projection) => {
		const privateChats = await coreServices.findMany(
			{
				"participants.participantId": data.currentParticipant.userId,
			},
			options,
			projection
		);

		return {
			privateChats,
		};
	})
	.build();