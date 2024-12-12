import { CiLock } from "react-icons/ci";
import { CiServer } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";
import { HiMiniLanguage } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LuFolders } from "react-icons/lu";
import { LuBatteryCharging } from "react-icons/lu";
import { MdOutlinePermCameraMic } from "react-icons/md";
import { RiAccountCircle2Line } from "react-icons/ri";

import { type SettingsList } from "../types";

export const settingsList: SettingsList = [
	{
		disabled: false,
		displayName: "My Profile",
		Icon: RiAccountCircle2Line,
		name: "myProfile",
	},
	{
		disabled: true,
		displayName: "Notifications and Sounds",
		Icon: IoIosNotificationsOutline,
		name: "notificationsAndSounds",
	},
	{
		disabled: false,
		displayName: "Privacy and Security",
		Icon: CiLock,
		name: "privacyAndSecurity",
	},
	{
		disabled: true,
		displayName: "Chat Settings",
		Icon: IoChatbubbleOutline,
		name: "chatSettings",
	},
	{
		disabled: true,
		displayName: "Folders",
		Icon: LuFolders,
		name: "folders",
	},
	{
		disabled: true,
		displayName: "Advanced",
		Icon: GiSettingsKnobs,
		name: "advanced",
	},
	{
		disabled: true,
		displayName: "Speakers and Camera",
		Icon: MdOutlinePermCameraMic,
		name: "speakersAndCamera",
	},
	{
		disabled: true,
		displayName: "Battery and Animations",
		Icon: LuBatteryCharging,
		name: "batteryAndAnimations",
	},
	{
		disabled: true,
		displayName: "Language",
		Icon: HiMiniLanguage,
		name: "language",
	},
	{
		disabled: false,
		displayName: "Server Setup",
		Icon: CiServer,
		name: "serverSetup",
	},
];
