import { Field } from "@repo/model";
import { AsyncCheckFunction, SyncCheckFunction } from "fastest-validator";

import { ValidationModelBuilder } from "../classes";
import { models } from "../models";

export type ValidatorFnType = AsyncCheckFunction | SyncCheckFunction;

export const validators = Object.entries(models.validation).reduce(
	(prevValue, [fieldName, model]) => {
		prevValue[fieldName as Field] = ValidationModelBuilder.compiler(model);
		return prevValue;
	},
	{} as { [key in Field]: ValidatorFnType }
);
