import { HydratedUser } from "@repo/model";
import { ExtendedCellphone, UserId } from "@repo/types";

import { ServiceMiddleware } from "~/types";

import { commonMiddlewares } from "../common";

export const findTargetUser: ServiceMiddleware<
	{
		targetUserId?: UserId;
		targetUserCellphone?: ExtendedCellphone;
	},
	{
		targetUser: HydratedUser;
	}
> = async (data) => {
	const { user } = await commonMiddlewares.findUser({
		cellphone: data.targetUserCellphone,
		errorReason: "TARGET_USER_NOT_EXIST",
		userId: data.targetUserId,
	});

	return {
		targetUser: user,
	};
};
