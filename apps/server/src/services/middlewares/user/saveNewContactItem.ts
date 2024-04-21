import { HydratedUser } from "@repo/model";
import { DBContactItem } from "@repo/type-store";

import { ServiceMiddleware } from "~/types";

export const saveNewContactItem: ServiceMiddleware<
	{
		currentUser: HydratedUser;
		newContact: DBContactItem;
	},
	void
> = async (data) => {
	data.currentUser.contacts.push(data.newContact);
	await data.currentUser.save();
};
