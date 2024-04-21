import { validationChecker } from "@repo/validator";
import { ValidationCheckerFnCollection } from "@repo/validator";
import { countries } from "@repo/vars";

import { notificationStore } from "~/classes/NotificationStore";
import { stuffStore } from "~/classes/StuffStore";
import { Field, ValidationCheckerFn } from "~/types";

export const validationCheckers = Object.keys(stuffStore.models).reduce(
	(prevValue, currValue) => {
		const k = currValue as Field;

		prevValue[k] = (result, value) =>
			validationChecker(result, k, value).check();

		return prevValue;
	},
	{} as ValidationCheckerFnCollection
);

const {
	countryCode: defaultCountryCodeChecker,
	countryName: defaultCountryNameChecker,
} = validationCheckers;

validationCheckers.countryCode = (result, value) => {
	if (result === true) {
		const country = countries.find((c) => c.countryCode === value);
		if (typeof country === "undefined")
			notificationStore.find("COUNTRY_CODE_NOT_SUPPORTED");

		return;
	}

	defaultCountryCodeChecker(result, value);
};

validationCheckers.countryName = (result, value) => {
	if (result === true) {
		const country = countries.find((c) => c.countryName === value);

		if (typeof country === "undefined")
			notificationStore.find("COUNTRY_NAME_NOT_SUPPORTED");

		return;
	}

	defaultCountryNameChecker(result, value);
};

const notImplementedCheckerFn = (fieldName: Field) =>
	(() => {
		throw Error(`${fieldName}ValidationChecker is not implemented`);
	}) as ValidationCheckerFn;

validationCheckers.createdAt = notImplementedCheckerFn("createdAt");
validationCheckers.id = notImplementedCheckerFn("id");
validationCheckers.isActive = notImplementedCheckerFn("isActive");
validationCheckers.macAddress = notImplementedCheckerFn("macAddress");
validationCheckers.messageId = notImplementedCheckerFn("messageId");
validationCheckers.senderId = notImplementedCheckerFn("senderId");
