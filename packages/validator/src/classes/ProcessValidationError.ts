import { ErrorReason, NativeError, errorStore } from "@repo/error-store";
import { ValidationError } from "fastest-validator";

import {
	ProcessedValidationError,
	ValidationErrors,
} from "../types/validation";

export class ProcessValidationError {
	private collectedErrors: NativeError[] = [];

	constructor(private validationErrors: ValidationErrors) {}

	process() {
		this.validationErrors.forEach((item) => {
			const nativeError = this.resolveNativeError(item.message);
			const processedValidationError = this.processError(item, nativeError);
			this.collectedErrors.push(processedValidationError);
		});
	}

	resolveNativeError(message?: string) {
		return (
			errorStore.find(message as ErrorReason) ||
			errorStore.find("UNKNOWN_VALIDATION_ERROR")
		);
	}

	processError(
		validationError: ValidationError,
		error: NativeError
	): ProcessedValidationError {
		return {
			...error,
			result: validationError,
		};
	}
}

export const processValidationError = (validationResult: ValidationErrors) =>
	new ProcessValidationError(validationResult);
