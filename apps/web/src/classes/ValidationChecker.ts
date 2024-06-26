import { notificationStore } from "~/classes/NotificationStore";
import {
	ErrorTypes,
	Field,
	NativeError,
	NativeModelKey,
	ValidationCheckerError,
	ValidationCheckerIgnores,
	ValidationErrors,
	ValidationResult,
} from "~/types";
import { utils } from "~/utils";

export class ValidationChecker {
	private collectedErrors: NativeError[] = [];

	private errorTypes: ErrorTypes;

	constructor(
		private validationResult: ValidationResult,
		private fieldName: Field,
		private value: unknown,
		private ignores: ValidationCheckerIgnores = []
	) {}

	check() {
		if (this.validationResult === true) return;

		this.errorTypes = convertErrorTypesToBoolean(this.validationResult);

		this.required()
			.stringEmpty()
			.string()
			.stringMax()
			.stringMin()
			.stringNumeric()
			.stringLength();

		this.collectedErrors = this.collectedErrors.filter(
			(item) => !this.ignores.includes(item.reason)
		);

		if (this.collectedErrors.length) throw this.collectedErrors;
	}

	stringEmpty() {
		this.pushError(this.errorTypes.stringEmpty, this.findError("empty"));
		return this;
	}
	required() {
		this.pushError(this.errorTypes.required, this.findError("required"));
		return this;
	}
	string() {
		this.pushError(this.errorTypes.string, this.findError("type"));
		return this;
	}
	stringNumeric() {
		this.pushError(this.errorTypes.stringNumeric, this.findError("numeric"));
		return this;
	}
	stringLength() {
		this.pushError(this.errorTypes.stringLength, this.findError("length"));
		return this;
	}
	stringMin() {
		this.pushError(this.errorTypes.stringMin, this.findError("minLength"));
		return this;
	}
	stringMax() {
		this.pushError(this.errorTypes.stringMax, this.findError("maxLength"));
		return this;
	}
	throwAnyway(error: NativeError) {
		this.pushError(true, error);
		return this;
	}

	findError(prop: NativeModelKey) {
		return notificationStore.find(
			utils.makeModelErrorReason(this.fieldName, prop)
		);
	}

	pushError(condition: boolean, error: NativeError) {
		if (condition) this.collectedErrors.push(this.makeError(error));

		return this;
	}

	makeError(error: NativeError): ValidationCheckerError {
		return {
			...error,
			result: this.validationResult as ValidationErrors,
			validatedFieldName: this.fieldName,
			validatedValue: this.value,
		};
	}
}

const convertErrorTypesToBoolean = (errors: ValidationErrors) => {
	const validatorErrorTypes = utils.getDefaultValidatorErrorTypes();

	errors.forEach((error) => {
		validatorErrorTypes[error.type as keyof ErrorTypes] = true;
	});

	return validatorErrorTypes;
};

export const validationChecker = (
	validationResult: ValidationResult,
	fieldName: Field,
	value: unknown,
	ignores?: ValidationCheckerIgnores
) => new ValidationChecker(validationResult, fieldName, value, ignores);
