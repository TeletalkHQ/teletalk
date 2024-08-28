import { extractor } from "@repo/classes";
import { HydratedUser } from "@repo/model";
import { UserId, UserPublicData } from "@repo/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";

export const getPublicData = serviceBuilder
	.create<
		{
			targetUserId: UserId;
		},
		{
			publicData: UserPublicData;
		},
		{
			targetUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findTargetUser)
	.setBody(async (data) => {
		return {
			publicData: extractor.userPublicData(data.targetUser),
		};
	})
	.build();
