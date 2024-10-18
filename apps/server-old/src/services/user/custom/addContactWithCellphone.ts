import { HydratedUser } from "@repo/model";
import {
	DBContactItem,
	FullName,
	SessionId,
	UnknownCellphone,
} from "@repo/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";

export const addContact = serviceBuilder
	.create<
		{
			addingContact: UnknownCellphone & FullName;
			currentSessionId: SessionId;
			targetUserCellphone: UnknownCellphone;
		},
		{
			newContact: DBContactItem;
		},
		{
			currentUser: HydratedUser;
			targetUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(
		serviceMiddlewares.findCurrentUser,
		serviceMiddlewares.throwIfSelfDataRequested,
		serviceMiddlewares.findTargetUser,
		serviceMiddlewares.throwIfContactExist
	)
	.setBody(async (data) => {
		return {
			newContact: {
				userId: data.targetUser.userId,
				firstName: data.addingContact.firstName,
				lastName: data.addingContact.lastName,
				isCellphoneAccessible: true,
			} as DBContactItem,
		};
	})
	.setAfterRunMiddlewares(serviceMiddlewares.saveNewContactItem)
	.build();
