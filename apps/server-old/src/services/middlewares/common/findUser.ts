import { extractor } from "@repo/classes";
import { ErrorReason, errorStore } from "@repo/error-store";
import { HydratedUser } from "@repo/model";
import { Cellphone, SessionId, UserId } from "@repo/types";

import { coreServices } from "~/services/user/core";
import { ServiceMiddleware } from "~/types";

export const findUser: ServiceMiddleware<
	{
		sessionId?: SessionId;
		cellphone?: Cellphone;
		userId?: UserId;
		errorReason: ErrorReason;
	},
	{
		user: HydratedUser;
	}
> = async (data) => {
	let user: HydratedUser | null;

	//CLEANME
	if (data.sessionId) {
		user = await coreServices.find({
			["sessions.sessionId"]: data.sessionId,
		});
	} else if (data.cellphone) {
		user = await coreServices.find(extractor.cellphone(data.cellphone));
	} else if (data.userId) {
		user = await coreServices.find({ userId: data.userId });
	}

	if (!user!) throw errorStore.find(data.errorReason);

	return {
		user,
	};
};