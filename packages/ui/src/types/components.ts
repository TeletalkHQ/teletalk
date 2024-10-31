import { SelectChangeEvent, SelectProps, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { DialogStore } from "@repo/store";
import { VoidWithArg } from "@repo/types";
import {
	ChangeEvent,
	ChangeEventHandler,
	DetailedHTMLProps,
	HTMLAttributes,
	MouseEvent,
} from "react";

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

export type DivProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

export type SpanProps = DetailedHTMLProps<
	HTMLAttributes<HTMLSpanElement>,
	HTMLSpanElement
>;

export type CommonSelectChangeEvent<T = unknown> = SelectChangeEvent<T>;

export type CommonSelectOnChange<T = unknown> = VoidWithArg<
	CommonSelectChangeEvent<T>
>;

export type CommonChangeEvent = ChangeEvent<
	HTMLInputElement | HTMLTextAreaElement
>;

export type HTMLProps = HTMLAttributes<HTMLLIElement>;

export type OnChangeValidatorFn = (
	value: any,
	e:
		| {
				target: {
					value: any;
					name: string;
				};
		  }
		| CommonChangeEvent
) => void;

export type ElementLabel = string;

export type IconType = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
	muiName: string;
};

export type HTMLDivMouseEvent = MouseEvent<
	HTMLDivElement,
	globalThis.MouseEvent
>;

export type OnDialogClose = VoidWithArg<DialogStore.DialogName>;

export type OnInputChange = ChangeEventHandler<
	HTMLInputElement | HTMLTextAreaElement
>;

export type OnSelectOnChange = SelectProps["onChange"];
