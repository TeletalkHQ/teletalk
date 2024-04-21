import { IPrivateChatDoc, models } from "@repo/model";
import { PrivateChats } from "@repo/type-store";
import { FilterQuery } from "mongoose";

import { PrivateChatService } from "~/types";

export const findMany: PrivateChatService<
	FilterQuery<IPrivateChatDoc>,
	PrivateChats
> = (data, options, projection) => {
	return models.database.PrivateChat.find(data, projection, options);
};
