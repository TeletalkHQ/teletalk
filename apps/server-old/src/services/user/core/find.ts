import { HydratedUser, IUserDoc, models } from "@repo/model";
import { FilterQuery } from "mongoose";

import { UserService } from "~/types";

export const find: UserService<FilterQuery<IUserDoc>, HydratedUser | null> = (
	data,
	options,
	projection
) => {
	return models.database.User.findOne(data, projection, options);
};
