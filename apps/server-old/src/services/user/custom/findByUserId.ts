import { extractor } from "@repo/classes";
import { HydratedUser } from "@repo/model";
import { DBUserData, UserId } from "@repo/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";

export const findByUserId = serviceBuilder
	.create<
		{
			targetUserId: UserId;
		},
		DBUserData,
		{
			targetUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findTargetUser)
	.setBody((data) => {
		return extractor.dbUserData(data.targetUser);
	})
	.build();
