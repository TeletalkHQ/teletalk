import { ExtendedUnknownCellphone, UnknownCellphone } from "@repo/type-store";
import lodash from "lodash";
import { ScreamingSnakeCase } from "type-fest";

const errorThrower = <T>(condition: any, error: T) => {
	if (condition) {
		if (typeof error === "function") throw error();

		throw error;
	}
};

const printError = (callerName: string, error: any) => {
	console.error(`${callerName} catch, error: `, error);
};

const makeScreamingSnakeCase = <T extends string>(value: T) =>
	upperSnake(value) as ScreamingSnakeCase<T>;

const upperSnake = (value: string) => lodash.snakeCase(value).toUpperCase();

const isDataHasEqualityWithTargetCellphone = (
	data: ExtendedUnknownCellphone,
	targetCellphone: UnknownCellphone
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

export const utils = {
	errorThrower,
	isDataHasEqualityWithTargetCellphone,
	makeScreamingSnakeCase,
	printError,
	upperSnake,
};
