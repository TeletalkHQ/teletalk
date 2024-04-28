import { extractor } from "@repo/classes";
import { HydratedUser } from "@repo/model";
import { DBUserData, SessionId } from "@repo/type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";

export const findBySessionId = serviceBuilder
	.create<
		{
			currentSessionId: SessionId;
		},
		{
			user: DBUserData;
		},
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
	.setBody((data) => {
		return {
			user: extractor.dbUserData(data.currentUser),
		};
	})
	.build();
