import { NativeError } from "@repo/error-store";
import { Field } from "@repo/model";
import {
	AsyncCheckFunction,
	SyncCheckFunction,
	ValidationError,
} from "fastest-validator";

import { utils } from "../../utils";

const ERROR_TYPES = utils.getDefaultValidatorErrorTypes();
export type ErrorTypes = typeof ERROR_TYPES;
export type ValidationErrors = ValidationError[];

export interface ProcessedValidationError extends NativeError {
	result: ValidationError;
}
export type ValidationResult = true | ValidationErrors;

export type ValidatorFnType = AsyncCheckFunction | SyncCheckFunction;

export type ValidationCheckerFn = (r: ValidationResult, value: unknown) => void;

export type ValidationCheckerFnCollection = {
	[prop in Field]: ValidationCheckerFn;
};

export type Validator = (param: any) => Promise<void>;
