import { errorBuilder } from "../../classes/ErrorBuilder";

export const customErrors = [
	errorBuilder()
		.authError()
		.reason("SESSION_COOKIE_REQUIRED")
		.authError()
		.build(),
	errorBuilder().reason("BLACKLIST_ITEM_EXIST").build(),
	errorBuilder().reason("BLACKLIST_ITEM_NOT_EXIST").build(),
	errorBuilder().reason("TARGET_USER_IS_BLACKLISTED").build(),
	errorBuilder().reason("CURRENT_USER_IS_BLACKLISTED").build(),
	errorBuilder().reason("PRIVATE_CHAT_NOT_EXIST").build(),
	errorBuilder().reason("PRIVATE_CHAT_EXIST").build(),
	errorBuilder().reason("SESSION_ID_CAN_NOT_VERIFIED").authError().build(),
	errorBuilder().reason("SESSION_INVALID").authError().build(),
	errorBuilder().reason("SESSION_NOT_FOUND").authError().build(),
	errorBuilder().reason("SESSION_NOT_VERIFIED").authError().build(),
	errorBuilder().reason("CONTACT_ITEM_EXIST").build(),
	errorBuilder().reason("CONTACT_ITEM_NOT_EXIST").build(),
	errorBuilder().reason("COOKIE_IS_NOT_DEFINED").authError().build(),
	errorBuilder().reason("COUNTRY_CODE_NOT_SUPPORTED").build(),
	errorBuilder().reason("COUNTRY_NAME_NOT_SUPPORTED").build(),
	errorBuilder().reason("CURRENT_SESSION_NOT_EXIST").authError().build(),
	errorBuilder().reason("CURRENT_USER_EXIST").build(),
	errorBuilder().reason("CURRENT_USER_NOT_EXIST").authError().build(),
	errorBuilder().reason("EVENT_NOT_FOUND").build(),
	errorBuilder().reason("IS_NOT_A_CALLBACK").build(),
	errorBuilder().reason("SELF_DATA_REQUESTED").build(),
	errorBuilder()
		.reason("SEND_JSON_RESPONSE_IS_NOT_FUNCTION")
		.side("SERVER")
		.build(),
	errorBuilder().reason("SEND_SMS_FAILED").side("SERVER").build(),
	errorBuilder().reason("SENDER_EMPTY").build(),
	errorBuilder().reason("SERVER_CRITICAL_ERROR").side("SERVER").build(),
	errorBuilder()
		.reason("SHOULD_NOT_SEND_BOTH_USER_ID_AND_CELLPHONE_PROPERTIES")
		.build(),
	errorBuilder().reason("TARGET_USER_NOT_EXIST").build(),
	errorBuilder().reason("UNKNOWN_ERROR").build(),
	errorBuilder().reason("UNKNOWN_VALIDATION_ERROR").side("SERVER").build(),
	errorBuilder().reason("USER_EXIST").build(),
	errorBuilder().reason("USER_NO_LONGER_PARTICIPANT").build(),
	errorBuilder().reason("ECONNABORTED").build(),
	errorBuilder().reason("EVENT_IS_BROKEN").build(),
	errorBuilder().reason("REQUIREMENT_ITEM_MISSING").build(),
	errorBuilder().reason("SERVER_ALREADY_EXIST").build(),
];