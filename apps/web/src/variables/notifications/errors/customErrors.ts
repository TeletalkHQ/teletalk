import { notificationBuilder } from "~/classes/NotificationBuilder";

export const customErrors = [
  notificationBuilder().reason("ECONNABORTED").build(),
  notificationBuilder().reason("EVENT_IS_BROKEN").build(),
  notificationBuilder().reason("INPUT_DATA_NOT_DEFINED").build(),
  notificationBuilder().reason("INPUT_FIELD_INVALID_TYPE").build(),
  notificationBuilder().reason("INPUT_FIELDS_MISSING").build(),
  notificationBuilder().reason("INPUT_FIELDS_OVERLOAD").build(),
  notificationBuilder().reason("IS_NOT_A_CALLBACK").build(),
  notificationBuilder().reason("OUTPUT_DATA_NOT_DEFINED").build(),
  notificationBuilder().reason("OUTPUT_FIELD_INVALID_TYPE").build(),
  notificationBuilder().reason("OUTPUT_FIELD_TYPE_WRONG").build(),
  notificationBuilder().reason("OUTPUT_FIELDS_MISSING").build(),
  notificationBuilder().reason("OUTPUT_FIELDS_OVERLOAD").build(),
  notificationBuilder().reason("REQUIRED_FIELD_INVALID_TYPE").build(),
  notificationBuilder().reason("REQUIRED_FIELD_INVALID").build(),
  notificationBuilder().reason("REQUIRED_FIELDS_NOT_DEFINED").build(),
  notificationBuilder().reason("REQUIRED_IO_FIELD_IS_NOT_ARRAY").build(),
  notificationBuilder().reason("REQUIRED_IO_FIELD_IS_NOT_OBJECT").build(),
  notificationBuilder().reason("REQUIREMENT_ITEM_MISSING").build(),
  notificationBuilder().reason("SERVER_ALREADY_EXIST").build(),
  notificationBuilder().reason("UNKNOWN_ERROR").build(),
];
