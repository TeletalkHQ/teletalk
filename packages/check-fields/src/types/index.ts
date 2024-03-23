// eslint-disable-next-line no-use-before-define
export type FieldValueType = IoFields | [IoFields];
export type FieldType = "string" | "boolean" | "number" | "array" | "object";

export interface IoField {
	type: FieldType;
	value?: FieldValueType;
	required?: boolean;
}

export interface IoFields {
	[prop: string]: IoField;
}

export interface StringMap {
	[prop: string]: any;
}

export type CheckFieldsErrorReason =
	| "DATA_FIELD_INVALID_TYPE"
	| "DATA_FIELDS_MISSING"
	| "DATA_FIELDS_OVERLOAD"
	| "DATA_NOT_DEFINED"
	| "SCHEMA_INVALID"
	| "SCHEMA_INVALID_TYPE"
	| "SCHEMA_NOT_DEFINED";

export type IoError = {
	reason: CheckFieldsErrorReason;
	[prop: string]: any;
};

export type IoErrors = [
	{
		reason: "DATA_FIELD_INVALID_TYPE";
		[prop: string]: any;
	},
	{
		reason: "DATA_FIELDS_MISSING";
		[prop: string]: any;
	},
	{
		reason: "DATA_FIELDS_OVERLOAD";
		[prop: string]: any;
	},
	{
		reason: "DATA_NOT_DEFINED";
		[prop: string]: any;
	},
	{
		reason: "SCHEMA_INVALID";
		[prop: string]: any;
	},
	{
		reason: "SCHEMA_INVALID_TYPE";
		[prop: string]: any;
	},
	{
		reason: "SCHEMA_NOT_DEFINED";
		[prop: string]: any;
	},
];
