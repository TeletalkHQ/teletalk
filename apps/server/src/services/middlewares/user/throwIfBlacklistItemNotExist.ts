import { errorStore } from "@repo/error-store";
import { HydratedUser } from "@repo/model";
import { UserId } from "@repo/type-store";

import { ServiceMiddleware } from "~/types";

export const throwIfBlacklistItemNotExist: ServiceMiddleware<
	{
		currentUser: HydratedUser;
		targetUserId: UserId;
	},
	void
> = (data) => {
	const index = data.currentUser.blacklist.findIndex(
		(i) => i.userId === data.targetUserId
	);
	if (index === -1)
		throw {
			...errorStore.find("BLACKLIST_ITEM_NOT_EXIST"),
			targetUserData: data.targetUserId,
		};
};
