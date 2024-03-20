import { trier } from "simple-trier";

import {
  ErrorChecker,
  ErrorTypeItem,
  Field,
  NativeError,
  ValidationModel,
  ValidationResult,
  ValidatorType,
} from "~/types";
import { AutoBind } from "~/types/utils";
import { utils } from "~/utils";
import { validationCheckers } from "~/validationCheckers";

export class Validator {
  protected errorChecker: ErrorChecker;
  protected validationResult: ValidationResult;
  protected value: any;
  hasError = false;

  protected ignoredErrorTypesForInputValidator: ErrorTypeItem[] = [
    "required",
    "stringEmpty",
    "stringMin",
  ];

  constructor(
    protected fieldName: Field,
    protected compiledValidator: ValidatorType,
    protected model: ValidationModel
  ) {
    this.errorChecker = validationCheckers[fieldName];
  }

  checkErrors() {
    trier(this.checkErrors.name)
      .sync()
      .try(this.tryToCheckErrors)
      .catch(this.printErrors)
      .run();

    return this;
  }

  @AutoBind
  private tryToCheckErrors() {
    if (Array.isArray(this.validationResult) && this.validationResult.length)
      this.errorChecker(this.validationResult, this.value);
    return this;
  }

  @AutoBind
  private printErrors(errors: NativeError[]) {
    utils.printResponseErrors(errors);
    return this;
  }

  executeIfNoError(cb: (value: any) => void) {
    if (
      Array.isArray(this.validationResult) &&
      this.validationResult.length === 0
    ) {
      cb(this.value);
    }
  }
}

export const validator = (
  fieldName: Field,
  compiledValidator: ValidatorType,
  model: ValidationModel
) => new Validator(fieldName, compiledValidator, model);
