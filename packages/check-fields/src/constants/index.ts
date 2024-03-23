import { IoErrors } from "../types";

export const acceptableTypes = [
	"string",
	"boolean",
	"number",
	"array",
	"object",
];

export const defaultErrors: IoErrors = [
	{
		reason: "DATA_FIELD_INVALID_TYPE",
	},
	{
		reason: "DATA_FIELDS_MISSING",
	},
	{
		reason: "DATA_FIELDS_OVERLOAD",
	},
	{
		reason: "DATA_NOT_DEFINED",
	},
	{
		reason: "SCHEMA_INVALID",
	},
	{
		reason: "SCHEMA_INVALID_TYPE",
	},
	{
		reason: "SCHEMA_NOT_DEFINED",
	},
];
