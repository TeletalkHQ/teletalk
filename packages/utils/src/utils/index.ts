import { ExtendedUnknownCellphone, UnknownCellphone } from "@repo/type-store";
import lodash from "lodash";
import { ScreamingSnakeCase } from "type-fest";

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

export * from "./decorators";

export const utils = {
	isDataHasEqualityWithTargetCellphone,
	makeScreamingSnakeCase,
	upperSnake,
};
