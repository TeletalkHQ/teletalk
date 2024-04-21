import { SchemaDefinitionProperty, SchemaTypeOptions } from "mongoose";

import {
	Field,
	ModelErrorReason,
	NativeModelCollection,
	NativeModelKey,
} from "../../../../types";
import { utils } from "../../../../utils";
import { nativeModels } from "../../../native";

export const schemas = Object.entries(nativeModels).reduce(
	(prevValue, currValue) => {
		const key = currValue[0] as Field;
		const value = currValue[1];
		const model: SchemaDefinitionProperty = {};
		const mongoMaker = makeMongoSchemaValue(key);

		model.type = value.type;

		//CLEANME:
		if ("defaultValue" in model) model.default = model.defaultValue;
		if ("min" in model) model.minlength = mongoMaker("min");
		if ("max" in model) model.maxlength = mongoMaker("max");
		if ("trim" in model) model.trim = value.trim;
		if ("required" in model) model.required = mongoMaker("required");
		if ("unique" in model) model.unique = mongoMaker("unique");

		prevValue[key] = model;

		return prevValue;
	},
	{} as { [key in Field]: SchemaTypeOptions<any> }
);

function makeMongoSchemaValue<P extends keyof NativeModelCollection>(
	fieldName: P
) {
	return function <F extends keyof NativeModelCollection[P]>(
		prop: F
	): [NativeModelCollection[P][F], ModelErrorReason] {
		return [
			nativeModels[fieldName][prop],
			utils.makeModelErrorReason(fieldName, prop as NativeModelKey),
		];
	};
}
