import { SvgIconComponent } from "@mui/icons-material";

import { DialogName, VoidWithArg } from "~/types";

export type SettingDisplayName =
  | "Edit Profile"
  | "Notifications and Sounds"
  | "Privacy and Security"
  | "Chat Settings"
  | "Advanced"
  | "Call Settings"
  | "Language"
  | "Server Setup";

export type SettingItem = {
  disabled: boolean;
  displayName: SettingDisplayName;
  Icon: SvgIconComponent;
  name: DialogName;
};

export type SettingsList = SettingItem[];

export type OnSettingItemClick = VoidWithArg<SettingItem>;
