import { errorStore } from "@repo/error-store";
import { HydratedUser } from "@repo/model";
import { DBUserData, PartialEmptyCellphone } from "@repo/type-store";

import { extractor } from "~/classes/Extractor";
import { serviceBuilder } from "~/classes/service/ServiceBuilder";

import { coreServices } from "../core";

export const findByCellphone = serviceBuilder
	.create<
		{
			cellphone: PartialEmptyCellphone;
		},
		DBUserData,
		{
			currentUser: HydratedUser;
		}
	>()
	.setBody(async (data) => {
		const userData = await coreServices.find(data.cellphone);
		if (!userData) throw errorStore.find("CURRENT_USER_NOT_EXIST");
		return extractor.dbUserData(userData);
	})
	.build();
