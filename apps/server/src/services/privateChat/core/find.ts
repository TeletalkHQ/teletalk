import { HydratedPrivateChat, IPrivateChatDoc, models } from "@repo/model";
import { FilterQuery } from "mongoose";

import { PrivateChatService } from "~/types";

export const find: PrivateChatService<
	FilterQuery<IPrivateChatDoc>,
	HydratedPrivateChat | null
> = (data, options, projection) => {
	return models.database.PrivateChat.findOne(data, projection, options);
};
