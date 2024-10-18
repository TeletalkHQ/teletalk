import { HydratedUser } from "@repo/model";
import { SessionId, UserId, UserPublicData } from "@repo/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";

export const updatePublicInfo = serviceBuilder
	.create<
		{
			currentSessionId: SessionId;
			updateProperties: Partial<UserPublicData>;
		},
		{
			userId: UserId;
		},
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody(async (data) => {
		await data.currentUser.updateOne(data.updateProperties);

		return {
			userId: data.currentUser.userId,
		};
	})
	.build();
