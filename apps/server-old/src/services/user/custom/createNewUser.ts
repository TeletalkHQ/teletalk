import { HydratedUser } from "@repo/model";
import { DBUserData } from "@repo/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";

import { coreServices } from "../core";

export const createNewUser = serviceBuilder
	.create<
		DBUserData,
		void,
		{
			currentUser: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(serviceMiddlewares.throwIfUserExist)
	.setBody(async (data) => {
		await coreServices.create({
			userData: data,
		});
	})
	.build();
