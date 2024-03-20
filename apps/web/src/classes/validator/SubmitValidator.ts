import {
  Field,
  ValidationModel,
  ValidationResult,
  ValidatorType,
} from "~/types";

import { Validator } from "./Validator";

export class SubmitValidator extends Validator {
  checkValue(value: any) {
    this.validationResult = this.compiledValidator(value) as ValidationResult;

    if (this.validationResult === true) this.validationResult = [];
    else this.hasError = true;

    return this;
  }
}

export const submitValidator =
  (
    fieldName: Field,
    compiledValidator: ValidatorType,
    model: ValidationModel
  ) =>
  () =>
    new SubmitValidator(fieldName, compiledValidator, model);
