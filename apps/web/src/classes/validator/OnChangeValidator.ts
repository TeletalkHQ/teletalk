import {
  CommonChangeEvent,
  ErrorTypeItem,
  Field,
  ValidationModel,
  ValidationResult,
  ValidatorType,
} from "~/types";

import { Validator } from "./Validator";

export class OnChangeValidator extends Validator {
  changeEvent: CommonChangeEvent | React.SyntheticEvent;

  checkValue(e: CommonChangeEvent | React.SyntheticEvent, value?: string) {
    this.value =
      value ??
      {
        value: "",
        ...e.target,
      }.value;

    this.changeEvent = e;

    const validationResult = this.compiledValidator(
      this.value
    ) as ValidationResult;

    if (Array.isArray(validationResult)) {
      const extraIgnoreTypes: ErrorTypeItem[] = [];
      if (this.value === "") extraIgnoreTypes.push("stringNumeric");
      if (
        validationResult.some(
          (i) => (i.type as ErrorTypeItem) === "stringLength"
        ) &&
        this.value.length < this.model.length
      ) {
        extraIgnoreTypes.push("stringLength");
      }

      const filteredValidationResult = validationResult.filter(
        (errorItem) =>
          ![
            ...this.ignoredErrorTypesForInputValidator,
            ...extraIgnoreTypes,
          ].includes(errorItem.type as ErrorTypeItem)
      );

      this.validationResult = filteredValidationResult;
    } else {
      this.validationResult = [];
    }

    return this;
  }

  executeIfNoError(
    cb: (value: any, e: CommonChangeEvent | React.SyntheticEvent) => void
  ) {
    if (
      Array.isArray(this.validationResult) &&
      this.validationResult.length === 0
    ) {
      cb(this.value, this.changeEvent);
    }
  }
}

export const onChangeValidator =
  (
    fieldName: Field,
    compiledValidator: ValidatorType,
    model: ValidationModel
  ) =>
  () =>
    new OnChangeValidator(fieldName, compiledValidator, model);
