import { errorStore } from "@repo/error-store";
import { Cellphone, UserId } from "@repo/types";

import { coreServices } from "~/services/user/core";
import { ServiceMiddleware } from "~/types";

export const throwIfUserExist: ServiceMiddleware<
	| Cellphone
	| {
			userId?: UserId;
			currentUserId?: UserId;
	  },
	void
> = async (data) => {
	const uid =
		"userId" in data
			? data.userId
			: "currentUserId" in data
				? data.currentUserId
				: undefined;

	const isUserExist = await coreServices.find({
		userId: uid,
	});

	if (isUserExist) throw errorStore.find("USER_EXIST");
};
