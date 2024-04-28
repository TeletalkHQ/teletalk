import { Field } from "@repo/model";

import { ValidationModelBuilder } from "../classes";
import { models } from "../models";
import { ValidatorFnType } from "../types";

export const validators = Object.entries(models.validation).reduce(
	(prevValue, [fieldName, model]) => {
		prevValue[fieldName as Field] = ValidationModelBuilder.compiler(model);
		return prevValue;
	},
	{} as { [key in Field]: ValidatorFnType }
);
