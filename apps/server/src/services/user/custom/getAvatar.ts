import { HydratedUser } from "@repo/model";
import { AvatarSrc, UserId } from "@repo/type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";

export const getAvatar = serviceBuilder
	.create<
		{
			targetUserId: UserId;
		},
		{
			avatarSrc: AvatarSrc;
		},
		{
			targetUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findTargetUser)
	.setBody((data) => {
		return {
			avatarSrc: data.targetUser.avatarSrc,
		};
	})
	.build();
