import { nativeModelBuilder } from "../../classes";
import { CreatedAt, Id } from "../../types";

export const commonModels = {
	createdAt: nativeModelBuilder
		.create<CreatedAt>()
		.type("number")
		.required(true)
		.empty(false)
		.build(),
	id: nativeModelBuilder
		.create<Id>()
		.type("string")
		.required(true)
		.empty(false)
		.min(30)
		.max(35)
		.trim(true)
		.unique(true)
		.build(),
};
