import { BaseSchema } from "@repo/schema";
import { StringMap } from "@repo/types";
import generatePassword from "generate-password";
import lodash from "lodash";
import { ScreamingSnakeCase } from "type-fest";

export const makeScreamingSnakeCase = <T extends string>(value: T) =>
	upperSnake(value) as ScreamingSnakeCase<T>;

export const upperSnake = (value: string) =>
	lodash.snakeCase(value).toUpperCase();

export const isDataHasEqualityWithTargetCellphone = (
	data: BaseSchema.Cellphone & StringMap,
	targetCellphone: BaseSchema.Cellphone
): never | boolean => {
	if (
		[
			targetCellphone.countryCode,
			targetCellphone.countryName,
			targetCellphone.phoneNumber,
			data.countryCode,
			data.countryName,
			data.phoneNumber,
		].some((i) => typeof i === "undefined")
	)
		throw {
			reason: "TARGET_CELLPHONE_INVALID",
			targetCellphone,
		};

	return !!(
		data.phoneNumber === targetCellphone.phoneNumber &&
		data.countryCode === targetCellphone.countryCode &&
		data.countryName === targetCellphone.countryName
	);
};

export const stringGenerator = (
	options: generatePassword.GenerateOptions = {}
) => {
	return generatePassword.generate({
		exclude: "",
		length: 6,
		lowercase: false,
		numbers: true,
		symbols: false,
		uppercase: false,
		...options,
	});
};

export * from "./decorators";
