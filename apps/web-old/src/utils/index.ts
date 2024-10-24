import createCache from "@emotion/cache";
import {
	Field,
	ModelErrorReason,
	NativeModel,
	NativeModelKey,
} from "@repo/model";
import { SocketResponseErrors } from "@repo/types";
import type { FullName, UnknownCellphone } from "@repo/types";
import { utils as pkgUtils } from "@repo/utils";
import { validators } from "@repo/validator";

import { appConfigs } from "~/classes/AppConfigs";
import { envManager } from "~/classes/EnvironmentManager";
import { notificationManager } from "~/classes/NotificationManager";
import { stuffStore } from "~/classes/StuffStore";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";
import { GlobalStore } from "~/store";
import { ModelName } from "~/types";

import { transformers } from "./transformers";

const isBrowser = typeof document !== "undefined";

const createEmotionCache = () => {
	let insertionPoint: HTMLElement | undefined;

	if (isBrowser) {
		const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
			"meta[name='emotion-insertion-point']"
		);
		insertionPoint = emotionInsertionPoint ?? undefined;
	}

	return createCache({ key: "mui-style", insertionPoint });
};

const isValueLengthInBetweenMinMax = (modelName: ModelName, value: string) => {
	const { max: maxLength, min: minLength } = stuffStore.models[
		modelName
	] as NativeModel;
	const inputValueLength = value.length;
	return inputValueLength >= minLength! && inputValueLength <= maxLength!;
};

const isValueLengthEqualToLength = (modelName: ModelName, value: string) => {
	return value.length === (stuffStore.models[modelName] as NativeModel).length;
};

const makeNonBreakSpace = (length: number) =>
	Array.from({ length }).map((_) => "&nbsp;");

const isIos = () => {
	return (
		typeof navigator !== "undefined" &&
		/iPad|iPhone|iPod/.test(navigator.userAgent)
	);
};

const isCountrySelected = (c: GlobalStore.WeirdSelectedCountry) => {
	return !!(c?.countryCode && c?.countryName && c?.countryShortName);
};

const registerWindowCustomProperties = () => {
	//@ts-expect-error //FIXME
	window.appConfigs = appConfigs;
	//@ts-expect-error //FIXME
	window.envManager = envManager;
	//@ts-expect-error //FIXME
	window.socketEmitterStore = socketEmitterStore;
	//@ts-expect-error //FIXME
	window.websocket = websocket;
};

const makeModelErrorReason = (
	fieldName: Field,
	modelKeyName: NativeModelKey
) => {
	return `${pkgUtils.makeScreamingSnakeCase(fieldName)}_${pkgUtils.makeScreamingSnakeCase(
		modelKeyName
	)}_ERROR` as ModelErrorReason;
};

const isCellphoneValid = (c: UnknownCellphone) => {
	return [
		//CLEANME
		validators.countryName(c.countryName) === true ? true : false,
		validators.countryCode(c.countryCode) === true ? true : false,
		validators.phoneNumber(c.phoneNumber) === true ? true : false,
	].some(Boolean);
};

const isContactWithCellphoneValid = (c: UnknownCellphone & FullName) => {
	return isCellphoneValid(c) || isFullNameValid(c);
};

const isFullNameValid = (fullName: FullName) =>
	[
		validators.firstName(fullName.firstName) === true ? true : false,
		validators.lastName(fullName.lastName) === true ? true : false,
	].some(Boolean);

const printResponseErrors = (errors: SocketResponseErrors) => {
	errors.forEach((item) => {
		notificationManager.printError(item.reason);
	});
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
	createEmotionCache,
	isCellphoneValid,
	isContactWithCellphoneValid,
	isCountrySelected,
	isFullNameValid,
	isIos,
	isValueLengthEqualToLength,
	isValueLengthInBetweenMinMax,
	makeModelErrorReason,
	makeNonBreakSpace,
	printResponseErrors,
	registerWindowCustomProperties,
	transformers,
};
