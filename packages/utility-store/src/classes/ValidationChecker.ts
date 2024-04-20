import { ValidationError } from "fastest-validator";

import { utils } from "../utils";

interface Options {
	extraErrorFields: {
		[prop: string]: any;
	};
}

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

const errorTypes = getDefaultValidatorErrorTypes();
type ErrorTypes = typeof errorTypes;
type Errors = ValidationError[];
type Result = true | Errors;

interface Model {
	empty: {
		value: any;
		error: any;
	};
	required: {
		value: any;
		error: any;
	};
	type: {
		value: any;
		error: any;
	};
	numeric: {
		value: any;
		error: any;
	};
	length: {
		value: any;
		error: any;
	};
	minLength: {
		value: any;
		error: any;
	};
	maxLength: {
		value: any;
		error: any;
	};
}

class ValidationChecker<T, U extends Model & T> {
	private errorCheckers: {
		condition: boolean;
		error: any;
	}[] = [];

	private errorTypes: ErrorTypes;

	constructor(
		private result: Result,
		public options: Partial<Options>,
		public model: U
	) {}

	getOptions() {
		return this.options;
	}
	setOptions(newOptions: Partial<Options> = this.getOptions()) {
		const oldOptions = this.getOptions();
		this.options = {
			...oldOptions,
			...newOptions,
		};
		return this;
	}

	getModel() {
		return this.model;
	}

	addExtraErrorFields(fields = {}) {
		this.setOptions({
			extraErrorFields: {
				...this.getOptions().extraErrorFields,
				...fields,
			},
		});

		return this;
	}

	check(cb: (this: ValidationChecker<T, U>) => void) {
		if (this.result === true) return;

		this.errorTypes = convertErrorTypesToBoolean(this.result);
		cb.call(this);
		this.execute();
	}

	stringEmpty(error = this.resolveError("empty")) {
		this.addErrorChecker(this.errorTypes.stringEmpty, error);
		return this;
	}
	required(error = this.resolveError("required")) {
		this.addErrorChecker(this.errorTypes.required, error);
		return this;
	}
	string(error = this.resolveError("type")) {
		this.addErrorChecker(this.errorTypes.string, error);
		return this;
	}
	stringNumeric(error = this.resolveError("numeric")) {
		this.addErrorChecker(this.errorTypes.stringNumeric, error);
		return this;
	}
	stringLength(error = this.resolveError("length")) {
		this.addErrorChecker(this.errorTypes.stringLength, error);
		return this;
	}
	stringMin(error = this.resolveError("minLength")) {
		this.addErrorChecker(this.errorTypes.stringMin, error);
		return this;
	}
	stringMax(error = this.resolveError("maxLength")) {
		this.addErrorChecker(this.errorTypes.stringMax, error);
		return this;
	}
	throwAnyway(error: any) {
		this.addErrorChecker(true, error);
		return this;
	}

	resolveError(key: keyof Model) {
		return this.getModel()[key]?.error;
	}

	addErrorChecker(condition: boolean, error: any) {
		this.errorCheckers.push({
			condition,
			error,
		});

		return this;
	}

	execute() {
		for (const item of this.errorCheckers) {
			const { condition, error } = item;
			utils.errorThrower(condition, () => this.makeError(error));
		}
	}

	makeError(error: object) {
		return {
			...error,
			result: this.result,
			...this.getOptions().extraErrorFields,
		};
	}
}

const convertErrorTypesToBoolean = (errors: Errors) => {
	const validatorErrorTypes = getDefaultValidatorErrorTypes();

	errors.forEach((error) => {
		validatorErrorTypes[error.type as keyof ErrorTypes] = true;
	});

	return validatorErrorTypes;
};

const validationChecker = <T>(
	result: Result,
	options: Partial<Options>,
	model: Model & T
) => new ValidationChecker(result, options, model);

export {
	type Errors,
	type ErrorTypes,
	type Options,
	type Result,
	validationChecker,
	ValidationChecker,
};
