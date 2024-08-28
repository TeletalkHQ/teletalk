import { errorStore } from "@repo/error-store";
import { HydratedUser } from "@repo/model";

import { ServiceMiddleware } from "~/types";

export const throwIfContactExist: ServiceMiddleware<
	{
		currentUser: HydratedUser;
		targetUser: HydratedUser;
	},
	void
> = (data) => {
	const { contacts } = data.currentUser;
	const error = {
		...errorStore.find("CONTACT_ITEM_EXIST"),
		queryData: data.targetUser.userId,
	};

	if (contacts.some((i) => i.userId == data.targetUser.userId)) throw error;
};
