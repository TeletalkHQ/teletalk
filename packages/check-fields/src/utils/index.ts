import { CheckFieldsErrorReason, IoErrors } from "../types";

export const errorThrower = <T>(condition: boolean, ERROR: T) => {
	if (condition) {
		if (typeof ERROR === "function") throw ERROR();

		throw ERROR;
	}
};

export const upperFirst = (string: string) =>
	string.charAt(0).toUpperCase() + string.slice(1);

export const findError = (errors: IoErrors, reason: CheckFieldsErrorReason) =>
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	errors.find((i) => i.reason === reason)!;
