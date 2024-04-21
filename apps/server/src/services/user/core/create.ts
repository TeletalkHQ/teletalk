import { models } from "@repo/model";
import { DBUserData } from "@repo/type-store";

import { UserService } from "~/types";

export const create: UserService<
	{
		userData: DBUserData;
	},
	void
> = async (data) => {
	await models.database.User.create(data.userData);
};
