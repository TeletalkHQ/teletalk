import { extractor } from "@repo/classes";
import { HydratedUser } from "@repo/model";
import { UserId, UserPublicData } from "@repo/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";

export const getUserPublicInfo = serviceBuilder
	.create<
		{
			targetUserId: UserId;
		},
		{
			publicInfo: UserPublicData;
		},
		{
			targetUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findTargetUser)
	.setBody(async (data) => {
		return {
			publicInfo: extractor.userPublicData(data.targetUser),
		};
	})
	.build();
