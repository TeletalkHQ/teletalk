import type {
	CircularProgressProps,
	SelectChangeEvent,
	SelectProps,
} from "@mui/material";
import type { DialogStore } from "@repo/store";
import { type VoidWithArg } from "@repo/types";
import type {
	ChangeEvent,
	ChangeEventHandler,
	DetailedHTMLProps,
	HTMLAttributes,
	MouseEvent,
} from "react";

// TODO: Remove
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

export type HTMLDivMouseEvent = MouseEvent<
	HTMLDivElement,
	globalThis.MouseEvent
>;

export type OnDialogClose = VoidWithArg<DialogStore.DialogName>;

export type OnTextInputChange = ChangeEventHandler<
	HTMLInputElement | HTMLTextAreaElement
>;

export type OnSelectOnChange = SelectProps["onChange"];

export type ProgressColor = CircularProgressProps["color"];
