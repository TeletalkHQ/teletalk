import { HydratedUser } from "@repo/model";
import { AvatarSrc, SessionId, UserId } from "@repo/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";

export const updateAvatar = serviceBuilder
	.create<
		{
			currentSessionId: SessionId;
			avatarSrc: AvatarSrc;
		},
		{
			userId: UserId;
		},
		{ currentUser: HydratedUser }
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody((data) => {
		data.currentUser.avatarSrc = data.avatarSrc;
		data.currentUser.save();

		return {
			userId: data.currentUser.userId,
		};
	})
	.build();
