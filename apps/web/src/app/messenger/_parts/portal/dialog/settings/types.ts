import { DialogStore } from "@repo/store";
import { VoidWithArg } from "@repo/types";
import { GeneratedIcon } from "@repo/ui/utils";

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
	Icon: GeneratedIcon;
	name: DialogStore.DialogName;
};

export type SettingsList = SettingItem[];

export type OnSettingItemClick = VoidWithArg<SettingItem>;
