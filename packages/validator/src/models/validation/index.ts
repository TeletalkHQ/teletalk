import { Field, models } from "@repo/model";
import { ValidationSchema } from "fastest-validator";

import { validationModelBuilder } from "../../classes/ValidationModelBuilder";

export type ValidationCollection = {
	[F in Field]: ValidationSchema;
};

export const validationModels: ValidationCollection = Object.keys(
	models.native
).reduce((prevValue, currValue) => {
	const model = models.native[currValue as Field];

	const builder = validationModelBuilder(currValue as Field).setModel(model);

	Object.keys(model).forEach((key) => {
		if (key in builder && typeof (builder as any)[key] === "function")
			(builder as any)[key]();
	});

	prevValue[currValue as Field] = builder.build();
	return prevValue;
}, {} as ValidationCollection);
