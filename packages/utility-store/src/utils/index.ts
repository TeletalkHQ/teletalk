import { ExtendedUnknownCellphone, UnknownCellphone } from "@repo/type-store";
import is from "@sindresorhus/is";

const errorThrower = <T>(condition: any, error: T) => {
	if (condition) {
		if (typeof error === "function") throw error();

		throw error;
	}
};

const printError = (callerName: string, error: any) => {
	console.error(`${callerName} catch, error: `, error);
};

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
		].some((i) => is.undefined(i))
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

const convertFileToBase64 = (file: File | Blob) => {
	return new Promise((resolve, reject) => {
		if (file) {
			const Reader = new FileReader();
			Reader.readAsDataURL(file);
			Reader.onloadend = () => {
				resolve(Reader.result);
			};
			Reader.onerror = reject;
		}
	});
};

export const utils = {
	convertFileToBase64,
	errorThrower,
	isDataHasEqualityWithTargetCellphone,
	printError,
};
