import { LoadingButtonProps } from "@mui/lab";
import { SelectChangeEvent, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import {
  ChangeEvent,
  ChangeEventHandler,
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEvent,
} from "react";

import { VoidNoArgsFn, VoidWithArg } from ".";
import { DialogName } from "./store";

export type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type SpanProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export type CommonOnClose = VoidNoArgsFn;

export type CommonOnChange = ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

export type CommonSelectChangeEvent = SelectChangeEvent<unknown>;

export type CommonSelectOnChange = VoidWithArg<CommonSelectChangeEvent>;

export type CommonChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type HTMLProps = HTMLAttributes<HTMLLIElement>;

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
  | "search"
  | "settings"
  | "send"
  | "unread"
  | "username"
  | "verificationCode";

export type OnChangeValidatorFn = (
  value: any,
  e:
    | {
        target: {
          value: any;
          name: ElementName;
        };
      }
    | CommonChangeEvent
) => void;

export type ElementLabel =
  | "Account"
  | "All Chats"
  | "Attach File"
  | "Back"
  | "Bio"
  | "Bot"
  | "Calls"
  | "Channels"
  | "Check"
  | "Choose a country"
  | "Close"
  | "Code"
  | "Contacts"
  | "Create"
  | "Creating..."
  | "Edit Chats"
  | "Emoji Emotions"
  | "Fingerprint"
  | "First Name"
  | "Groups"
  | "Last Name"
  | "Lock"
  | "Logout"
  | "Menu"
  | "MicNone"
  | "More"
  | "Name"
  | "New Channel"
  | "New Group"
  | "Next"
  | "Night Mode"
  | "Personal"
  | "Phone Number"
  | "Search"
  | "Settings"
  | "Sign in..."
  | "Send"
  | "Unread Messages"
  | "Url"
  | "Username"
  | "Verification Code"
  | "Verified User"
  | "Verify"
  | "Verifying...";

export type ElementId = ElementName;

export type IconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

export type HTMLDivMouseEvent = MouseEvent<
  HTMLDivElement,
  globalThis.MouseEvent
>;

export type OnDialogClose = VoidWithArg<DialogName>;

export interface CustomLoadingButtonProps extends LoadingButtonProps {
  loadingIndicatorText?: string;
}
