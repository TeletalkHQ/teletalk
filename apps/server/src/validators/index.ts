import { ValidationModelBuilder } from "~/classes/ValidationModelBuilder";
import { models } from "~/models";
import { ValidatorFnType } from "~/types";
import { Field } from "~/types/model";

export const validators = Object.entries(models.validation).reduce(
	(prevValue, [fieldName, model]) => {
		prevValue[fieldName as Field] = ValidationModelBuilder.compiler(model);
		return prevValue;
	},
	{} as { [key in Field]: ValidatorFnType }
);

export * from "./validationCheckers";
