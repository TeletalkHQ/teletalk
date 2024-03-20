import createCache from "@emotion/cache";
import lodash from "lodash";
import type { FullName, UnknownCellphone } from "teletalk-type-store";
import { ScreamingSnakeCase } from "type-fest";
import { utils as storeUtils } from "utility-store";

import { appConfigs } from "~/classes/AppConfigs";
import { envManager } from "~/classes/EnvironmentManager";
import { notificationManager } from "~/classes/NotificationManager";
import { stuffStore } from "~/classes/StuffStore";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";
import {
  CommonChangeEvent,
  Field,
  ModelErrorReason,
  ModelName,
  NativeModel,
  NativeModelKey,
  SocketResponseErrors,
  WeirdSelectedCountry,
} from "~/types";
import { validators } from "~/validators";

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
  const { maxLength, minLength } = stuffStore.models[modelName] as NativeModel;
  const inputValueLength = value.length;
  return inputValueLength >= minLength! && inputValueLength <= maxLength!;
};

const isValueLengthEqualToLength = (modelName: ModelName, value: string) => {
  return value.length === (stuffStore.models[modelName] as NativeModel).length;
};

const createOnChangeValidator =
  (fieldName: Field, onChangeFn: any) =>
  (e: CommonChangeEvent | React.SyntheticEvent, value?: any) => {
    validators[fieldName]
      .onChangeValidator()
      .checkValue(e, value)
      .checkErrors()
      .executeIfNoError(onChangeFn);
  };

const makeNonBreakSpace = (length: number) =>
  Array.from({ length }).map((_) => "&nbsp;");

const isIos = () => {
  return (
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  );
};

const isCountrySelected = (c: WeirdSelectedCountry) => {
  return !!(c?.countryCode && c?.countryName && c?.countryShortName);
};

const registerWindowCustomProperties = () => {
  //@ts-ignore
  window.appConfigs = appConfigs;
  //@ts-ignore
  window.envManager = envManager;
  //@ts-ignore
  window.socketEmitterStore = socketEmitterStore;
  //@ts-ignore
  window.websocket = websocket;
};

const makeScreamingSnakeCase = <T extends string>(value: T) =>
  upperSnake(value) as ScreamingSnakeCase<T>;

const upperSnake = (value: string) => lodash.snakeCase(value).toUpperCase();

const makeModelErrorReason = (
  fieldName: Field,
  modelKeyName: NativeModelKey
) => {
  return `${makeScreamingSnakeCase(fieldName)}_${makeScreamingSnakeCase(
    modelKeyName
  )}_ERROR` as ModelErrorReason;
};

const isCellphoneValid = (c: UnknownCellphone) => {
  return [
    validators.countryName.submitValidator().checkValue(c.countryName).hasError,
    validators.countryCode.submitValidator().checkValue(c.countryCode).hasError,
    validators.phoneNumber.submitValidator().checkValue(c.phoneNumber).hasError,
  ].some(Boolean);
};

const isContactWithCellphoneValid = (c: UnknownCellphone & FullName) => {
  return isCellphoneValid(c) || isFullNameValid(c);
};

const isFullNameValid = (fullName: FullName) =>
  [
    validators.firstName.submitValidator().checkValue(fullName.firstName)
      .hasError,
    validators.lastName.submitValidator().checkValue(fullName.lastName)
      .hasError,
  ].some(Boolean);

const getDefaultValidatorErrorTypes = () => ({
  array: false,
  arrayContains: false,
  arrayEmpty: false,
  arrayEnum: false,
  arrayLength: false,
  arrayMax: false,
  arrayMin: false,
  arrayUnique: false,
  boolean: false,
  date: false,
  dateMax: false,
  dateMin: false,
  email: false,
  emailEmpty: false,
  emailMax: false,
  emailMin: false,
  enumValue: false,
  equalField: false,
  equalValue: false,
  forbidden: false,
  function: false,
  luhn: false,
  mac: false,
  number: false,
  numberEqual: false,
  numberInteger: false,
  numberMax: false,
  numberMin: false,
  numberNegative: false,
  numberNotEqual: false,
  numberPositive: false,
  object: false,
  objectMaxProps: false,
  objectMinProps: false,
  objectStrict: false,
  required: false,
  string: false,
  stringAlpha: false,
  stringAlphadash: false,
  stringAlphanum: false,
  stringBase64: false,
  stringContains: false,
  stringEmpty: false,
  stringEnum: false,
  stringHex: false,
  stringLength: false,
  stringMax: false,
  stringMin: false,
  stringNumeric: false,
  stringPattern: false,
  stringSingleLine: false,
  tuple: false,
  tupleEmpty: false,
  tupleLength: false,
  url: false,
  uuid: false,
  uuidVersion: false,
});

const printResponseErrors = (errors: SocketResponseErrors) => {
  errors.forEach((item) => {
    notificationManager.printError(item.reason);
  });
};

export const utils = {
  ...storeUtils,
  createEmotionCache,
  createOnChangeValidator,
  getDefaultValidatorErrorTypes,
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
