import { validationModelBuilder } from "~/classes/ValidationModelBuilder";
import { nativeModels } from "~/models/native";
import { ValidationCollection } from "~/types";
import { Field } from "~/types/model";

export const validationModels: ValidationCollection = Object.keys(
	nativeModels
).reduce((prevValue, currValue) => {
	const model = nativeModels[currValue as Field];

	const builder = validationModelBuilder(currValue as Field).setModel(model);

	Object.keys(model).forEach((key) => {
		if (key in builder && typeof (builder as any)[key] === "function")
			(builder as any)[key]();
	});

	prevValue[currValue as Field] = builder.build();
	return prevValue;
}, {} as ValidationCollection);
