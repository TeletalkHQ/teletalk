import { errorThrower } from "check-fields";
import { customTypeof } from "custom-typeof";
import { countries } from "utility-store/lib/variables/countries";

import { notificationStore } from "~/classes/NotificationStore";
import { stuffStore } from "~/classes/StuffStore";
import { validationChecker } from "~/classes/ValidationChecker";
import {
  Field,
  ValidationCheckerFn,
  ValidationCheckerFnCollection,
} from "~/types";

export const validationCheckers = Object.keys(stuffStore.models).reduce(
  (prevValue, currValue) => {
    const k = currValue as Field;

    prevValue[k] = (result, value, ignores) =>
      validationChecker(result, k, value, ignores).check();

    return prevValue;
  },
  {} as ValidationCheckerFnCollection
);

const {
  countryCode: defaultCountryCodeChecker,
  countryName: defaultCountryNameChecker,
} = validationCheckers;

validationCheckers.countryCode = (result, value, ignores) => {
  if (result === true) {
    const country = countries.find((c) => c.countryCode === value);
    errorThrower(
      customTypeof.isUndefined(country),
      notificationStore.find("COUNTRY_CODE_NOT_SUPPORTED")
    );

    return;
  }

  defaultCountryCodeChecker(result, value, ignores);
};

validationCheckers.countryName = (result, value, ignores) => {
  if (result === true) {
    const country = countries.find((c) => c.countryName === value);
    errorThrower(
      customTypeof.isUndefined(country),
      notificationStore.find("COUNTRY_NAME_NOT_SUPPORTED")
    );

    return;
  }

  defaultCountryNameChecker(result, value, ignores);
};

const notImplementedCheckerFn = (fieldName: Field) =>
  (() => {
    throw Error(`${fieldName}ValidationChecker is not implemented`);
  }) as ValidationCheckerFn;

validationCheckers.id = notImplementedCheckerFn("id");
validationCheckers.createdAt = notImplementedCheckerFn("createdAt");
validationCheckers.isActive = notImplementedCheckerFn("isActive");
validationCheckers.macAddress = notImplementedCheckerFn("macAddress");
validationCheckers.messageId = notImplementedCheckerFn("messageId");
validationCheckers.senderId = notImplementedCheckerFn("senderId");
