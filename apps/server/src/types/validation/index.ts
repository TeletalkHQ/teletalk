import {
	AsyncCheckFunction,
	ValidationSchema as FVValidationSchema,
	SyncCheckFunction,
	ValidationError,
} from "fastest-validator";

import { utils } from "~/utils";

import { NativeError } from "..";
import { Field } from "../model";

export type ValidationSchema = FVValidationSchema;

export type ValidationCollection = {
	[F in Field]: ValidationSchema;
};

const ERROR_TYPES = utils.getDefaultValidatorErrorTypes();
export type ErrorTypes = typeof ERROR_TYPES;
export type ValidationErrors = ValidationError[];

export interface ValidationCheckerError extends NativeError {
	result: ValidationErrors;
	validatedValue: unknown;
	validatedFieldName: Field;
}
export type ValidationResult = true | ValidationErrors;

export type ValidatorFnType = AsyncCheckFunction | SyncCheckFunction;

export type ValidationCheckerFn = (r: ValidationResult, value: unknown) => void;

export type ValidationCheckerFnCollection = {
	[prop in Field]: ValidationCheckerFn;
};

export type Validator = (param: any) => Promise<void>;
