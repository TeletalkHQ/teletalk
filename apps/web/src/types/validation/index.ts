import { ErrorReason, NativeError } from "@repo/error-store";
import {
	AsyncCheckFunction,
	SyncCheckFunction,
	ValidationError,
	ValidationRuleObject,
} from "fastest-validator";

import { Field } from "~/types";

export type ValidationModel = ValidationRuleObject;

export type ValidationCollection = {
	[F in Field]: ValidationModel;
};

export type ValidationErrors = ValidationError[];

export interface ValidationCheckerError extends NativeError {
	result: ValidationErrors;
	validatedValue: unknown;
	validatedFieldName: Field;
}
export type ValidationResult = true | ValidationErrors;

export type FieldValidator = AsyncCheckFunction | SyncCheckFunction;

export type ValidationCheckerIgnores = ErrorReason[];

export type ValidationCheckerFn = (
	r: ValidationResult,
	value: unknown,
	ignores?: ValidationCheckerIgnores
) => void;

export type ValidationCheckerFnCollection = {
	[prop in Field]: ValidationCheckerFn;
};

export type Validator = (param: any) => Promise<void>;
