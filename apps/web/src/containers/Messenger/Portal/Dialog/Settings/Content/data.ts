//CLEANME: Move to icons
import AccountBoxIcon from "@mui/icons-material/AccountBoxTwoTone";
import CallIcon from "@mui/icons-material/CallTwoTone";
import ChatIcon from "@mui/icons-material/ChatTwoTone";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotificationsTwoTone";
import LanguageIcon from "@mui/icons-material/LanguageTwoTone";
import LockIcon from "@mui/icons-material/LockTwoTone";
import PieChartIcon from "@mui/icons-material/PieChartTwoTone";
import StorageIcon from "@mui/icons-material/Storage";

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
    Icon: CircleNotificationsIcon,
    name: "notificationsAndSounds",
  },
  {
    disabled: false,
    displayName: "Privacy and Security",
    Icon: LockIcon,
    name: "privacyAndSecurity",
  },
  {
    disabled: true,
    displayName: "Chat Settings",
    Icon: ChatIcon,
    name: "chatSettings",
  },
  {
    disabled: true,
    displayName: "Advanced",
    Icon: PieChartIcon,
    name: "advanced",
  },
  {
    disabled: true,
    displayName: "Call Settings",
    Icon: CallIcon,
    name: "callSettings",
  },
  {
    disabled: true,
    displayName: "Language",
    Icon: LanguageIcon,
    name: "language",
  },
  {
    disabled: false,
    displayName: "Server Setup",
    Icon: StorageIcon,
    name: "serverSetup",
  },
];
