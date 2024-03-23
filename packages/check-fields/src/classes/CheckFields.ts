/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomTypeof, customTypeof } from "custom-typeof";

import { acceptableTypes, defaultErrors } from "../constants";
import { IoError, IoErrors, IoFields, StringMap } from "../types";
import { errorThrower, findError, upperFirst } from "../utils";

export class CheckFields {
	constructor(
		public ioData: any,
		public requiredFields: IoFields,
		private errors: IoErrors
	) {}

	prepare() {
		this.throwErrorIfRequiredFieldsIsNotDefined(
			this.requiredFields,
			findError(this.errors, "SCHEMA_NOT_DEFINED")
		);

		this.throwErrorIfIoDataIsNotDefined(
			findError(this.errors, "DATA_NOT_DEFINED"),
			this.ioData,
			this.requiredFields
		);

		return this;
	}

	private throwErrorIfRequiredFieldsIsNotDefined(
		requiredFields: IoFields,
		ERROR: IoError
	) {
		errorThrower<IoError>(customTypeof.isUndefined(requiredFields), ERROR);
	}

	private throwErrorIfIoDataIsNotDefined(
		ERROR: IoError,
		ioData: IoFields,
		requiredFields: IoFields
	) {
		errorThrower(customTypeof.isUndefined(ioData), {
			...ERROR,
			ioData,
			requiredFields,
		});
	}

	check() {
		this.checkIoFieldsDefinition();
		this.checkLength();
		this.checkRequiredFields();
	}

	private checkIoFieldsDefinition() {
		errorThrower(!this.ioData, {
			...findError(this.errors, "DATA_FIELDS_MISSING"),
			ioData: this.ioData,
			requiredFields: this.requiredFields,
		});
		errorThrower(!this.requiredFields, {
			...findError(this.errors, "DATA_FIELDS_MISSING"),
			ioData: this.ioData,
			requiredFields: this.requiredFields,
		});
	}

	private checkLength() {
		const ioFieldsLength = Object.keys(this.ioData).length;
		const requiredFieldsLength = Object.keys(this.requiredFields).length;

		if (ioFieldsLength !== requiredFieldsLength) {
			const errorBase = {
				ioFieldsLength,
				requiredFieldsLength,
				ioData: this.ioData,
				requiredFields: this.requiredFields,
			};

			const missingError = {
				...errorBase,
				...findError(this.errors, "DATA_FIELDS_MISSING"),
			};
			errorThrower(ioFieldsLength < requiredFieldsLength, missingError);

			throw {
				...errorBase,
				...findError(this.errors, "DATA_FIELDS_OVERLOAD"),
			};
		}
	}

	private checkRequiredFields() {
		Object.entries(this.requiredFields).forEach(([key, requiredField]) => {
			this.checkRequiredFieldType(key, requiredField.type);
			const isValueDefined = requiredField.value;
			this.checkSchema(requiredField.type, requiredField.value);

			const ioValue = (this.ioData as any)[key];
			this.throwErrorIfIoFieldIsUndefined(key, ioValue);
			this.checkIoDataFieldType(key, ioValue, requiredField.type);

			if (isValueDefined) {
				this.checkNestedFields(requiredField.value, ioValue);
			}
		});
	}

	private throwErrorIfIoFieldIsUndefined(
		ioFieldKey: string,
		ioFieldValue: any
	) {
		errorThrower(customTypeof.isUndefined(ioFieldValue), {
			...findError(this.errors, "DATA_FIELDS_MISSING"),
			ioFieldIsUndefined: true,
			ioFieldKey,
			ioData: this.ioData,
			requiredFields: this.requiredFields,
		});
	}

	private checkRequiredFieldType(
		requiredFieldKey: string,
		requiredFieldType: string
	) {
		if (
			customTypeof.isString(requiredFieldType) &&
			acceptableTypes.includes(requiredFieldType)
		)
			return;

		throw {
			...findError(this.errors, "SCHEMA_INVALID_TYPE"),
			requiredField: {
				key: requiredFieldKey,
				type: requiredFieldType,
			},
			acceptableTypes,
		};
	}

	private checkIoDataFieldType(
		requiredFieldKey: string,
		ioFieldValue: any,
		requiredFieldType: string
	) {
		const typeofMethodName = `is${upperFirst(
			requiredFieldType
		)}` as keyof CustomTypeof;

		if (customTypeof[typeofMethodName](ioFieldValue)) return;

		throw {
			...findError(this.errors, "DATA_FIELD_INVALID_TYPE"),
			ioField: {
				expectedType: requiredFieldType,
				receivedType: typeof ioFieldValue,
				key: requiredFieldKey,
				value: ioFieldValue,
			},
			ioData: this.ioData,
			requiredFields: this.requiredFields,
		};
	}

	private checkSchema(schemaFieldType: string, schemaFieldValue: any) {
		const { type } = customTypeof.check(schemaFieldValue);
		const receivedType = type.isObject
			? "object"
			: //prettier-ignore
				type.isArray
        ? "array"
        : typeof schemaFieldValue;

		const errorBase = {
			...findError(this.errors, "SCHEMA_INVALID"),
			requiredFields: schemaFieldValue,
			receivedType,
		};

		if (["object", "array"].includes(schemaFieldType) && !schemaFieldValue) {
			throw {
				...errorBase,
				expectedValue: "object | array",
				receivedValue: schemaFieldValue,
			};
		}
		if (
			schemaFieldType === "object" &&
			customTypeof.isNotObject(schemaFieldValue)
		) {
			throw {
				...errorBase,
				expectedType: "object",
			};
		}
		if (
			schemaFieldType === "array" &&
			customTypeof.isNotArray(schemaFieldValue)
		) {
			throw {
				...errorBase,
				expectedType: "array",
			};
		}
		if (
			schemaFieldType !== "object" &&
			schemaFieldType !== "array" &&
			schemaFieldValue
		) {
			throw {
				...errorBase,
				expectedType: "object | array",
			};
		}
	}
	private checkNestedFields(requiredFieldValue: any, ioFieldValue: any) {
		if (customTypeof.isObject(requiredFieldValue))
			this.checkObjectFields(ioFieldValue, requiredFieldValue);
		else if (customTypeof.isArray(requiredFieldValue))
			this.checkArrayFields(ioFieldValue, requiredFieldValue[0] || {});
	}

	private checkObjectFields(ioData: any, requiredFields: IoFields) {
		checkFields(ioData, requiredFields, this.errors);
	}

	private checkArrayFields(ioData: any[], requiredFields: IoFields) {
		ioData.forEach((item: any) => {
			checkFields(item, requiredFields, this.errors);
		});
	}
}

export const checkFields = (
	ioData: StringMap,
	requiredFields: IoFields,
	errors: IoErrors = defaultErrors
) => new CheckFields(ioData, requiredFields, errors).prepare().check();
