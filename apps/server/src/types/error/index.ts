import { ModelErrorReason } from "../model";

export type CustomErrorReason =
	| "BLACKLIST_ITEM_EXIST"
	| "BLACKLIST_ITEM_NOT_EXIST"
	| "SESSION_COOKIE_REQUIRED"
	| "SESSION_ID_CAN_NOT_VERIFIED"
	| "SESSION_INVALID"
	| "SESSION_NOT_FOUND"
	| "SESSION_NOT_VERIFIED"
	| "CONTACT_ITEM_EXIST"
	| "CONTACT_ITEM_NOT_EXIST"
	| "COOKIE_IS_NOT_DEFINED"
	| "COUNTRY_CODE_NOT_SUPPORTED"
	| "COUNTRY_NAME_NOT_SUPPORTED"
	| "CURRENT_SESSION_NOT_EXIST"
	| "CURRENT_USER_EXIST"
	| "CURRENT_USER_NOT_EXIST"
	| "EVENT_IS_INVALID"
	| "EVENT_NOT_FOUND"
	| "INPUT_DATA_NOT_DEFINED"
	| "INPUT_FIELD_INVALID_TYPE"
	| "INPUT_FIELDS_MISSING"
	| "INPUT_FIELDS_OVERLOAD"
	| "IS_NOT_A_CALLBACK"
	| "OUTPUT_DATA_NOT_DEFINED"
	| "OUTPUT_FIELD_INVALID_TYPE"
	| "OUTPUT_FIELD_TYPE_WRONG"
	| "OUTPUT_FIELDS_MISSING"
	| "OUTPUT_FIELDS_OVERLOAD"
	| "PRIVATE_CHAT_EXIST"
	| "PRIVATE_CHAT_NOT_EXIST"
	| "REQUIRED_FIELD_INVALID_TYPE"
	| "REQUIRED_FIELD_INVALID"
	| "REQUIRED_FIELDS_NOT_DEFINED"
	| "REQUIRED_IO_FIELD_IS_NOT_ARRAY"
	| "REQUIRED_IO_FIELD_IS_NOT_OBJECT"
	| "SELF_DATA_REQUESTED"
	| "SEND_JSON_RESPONSE_IS_NOT_FUNCTION"
	| "SEND_SMS_FAILED"
	| "SENDER_EMPTY"
	| "SERVER_CRITICAL_ERROR"
	| "SHOULD_NOT_SEND_BOTH_USER_ID_AND_CELLPHONE_PROPERTIES"
	| "TARGET_USER_NOT_EXIST"
	| "UNKNOWN_ERROR"
	| "USER_EXIST"
	| "VALIDATION_MODEL_IS_NOT_OBJECT"
	| "TARGET_USER_IS_BLACKLISTED"
	| "CURRENT_USER_IS_BLACKLISTED"
	| "USER_NO_LONGER_PARTICIPANT";

export type ErrorReason = ModelErrorReason | CustomErrorReason;

export type ErrorSide = "SERVER" | "CLIENT";

export interface NativeError {
	description?: string;
	isAuthError: boolean;
	message?: string;
	reason: ErrorReason;
	side: ErrorSide;
}

export type ErrorCollection = NativeError[];

export type UnknownError = NativeError | NativeError[] | unknown | undefined;
