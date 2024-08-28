import { LoadingButtonProps } from "@mui/lab";
import { SelectProps, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ChangeEventHandler } from "react";

export type ElementName =
	| "account"
	| "addContacts"
	| "allChats"
	| "attachFile"
	| "back"
	| "bio"
	| "bot"
	| "calls"
	| "channels"
	| "check"
	| "close"
	| "contacts"
	| "countryCode"
	| "countryName"
	| "editChats"
	| "emojiEmotions"
	| "firstName"
	| "groups"
	| "lastName"
	| "lock"
	| "logout"
	| "menu"
	| "messageBox"
	| "micNone"
	| "more"
	| "newChannel"
	| "newGroup"
	| "nightMode"
	| "personal"
	| "phoneNumber"
	| "root"
	| "search"
	| "send"
	| "settings"
	| "unread"
	| "username"
	| "verificationCode";

export type ElementId = ElementName;

export type OnInputChange = ChangeEventHandler<
	HTMLInputElement | HTMLTextAreaElement
>;

export type OnSelectOnChange = SelectProps["onChange"];

export type IconType = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
	muiName: string;
};

export interface CustomLoadingButtonProps extends LoadingButtonProps {
	loadingIndicatorText?: string;
}
