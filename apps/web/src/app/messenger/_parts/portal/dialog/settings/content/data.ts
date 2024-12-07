import { AccountBoxIcon } from "@repo/ui/icons/accountBox";

import { SettingsList } from "../types";

export const settingsList: SettingsList = [
	{
		disabled: false,
		displayName: "Edit Profile",
		Icon: AccountBoxIcon,
		name: "editProfile",
	},
	{
		disabled: true,
		displayName: "Notifications and Sounds",
		Icon: AccountBoxIcon,
		name: "notificationsAndSounds",
	},
	{
		disabled: false,
		displayName: "Privacy and Security",
		Icon: AccountBoxIcon,
		name: "privacyAndSecurity",
	},
	{
		disabled: true,
		displayName: "Chat Settings",
		Icon: AccountBoxIcon,
		name: "chatSettings",
	},
	{
		disabled: true,
		displayName: "Advanced",
		Icon: AccountBoxIcon,
		name: "advanced",
	},
	{
		disabled: true,
		displayName: "Call Settings",
		Icon: AccountBoxIcon,
		name: "callSettings",
	},
	{
		disabled: true,
		displayName: "Language",
		Icon: AccountBoxIcon,
		name: "language",
	},
	{
		disabled: false,
		displayName: "Server Setup",
		Icon: AccountBoxIcon,
		name: "serverSetup",
	},
];
