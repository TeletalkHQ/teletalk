import { errorStore } from "@repo/error-store";
import { HydratedUser } from "@repo/model";
import { UserId } from "@repo/types";

import { ServiceMiddleware } from "~/types";

export const throwIfContactNotExist: ServiceMiddleware<
	{
		currentUser: HydratedUser;
		targetUserId: UserId;
	},
	void
> = (data) => {
	const index = data.currentUser.contacts.findIndex(
		(i) => i.userId == data.targetUserId
	);

	if (index === -1)
		throw {
			...errorStore.find("CONTACT_ITEM_NOT_EXIST"),
			queryData: data.targetUserId,
		};
};
