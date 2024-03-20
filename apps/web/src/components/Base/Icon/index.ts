import {
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  AnnouncementOutlined as AnnouncementOutlinedIcon,
  ArrowBack as ArrowBackIcon,
  AttachFile as AttachFileIcon,
  Brightness4Outlined as Brightness4OutlinedIcon,
  CallOutlined as CallOutlinedIcon,
  CampaignOutlined as CampaignOutlinedIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  Fingerprint as FingerprintIcon,
  ForumOutlined as ForumOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  Menu as MenuIcon,
  MicNone as MicNoneIcon,
  MoreVert as MoreVertIcon,
  PeopleOutline as PeopleOutlineIcon,
  PermIdentity as PermIdentityIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  Search as SearchIcon,
  SettingsInputComponentOutlined as SettingsInputComponentOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  SmartToyOutlined as SmartToyOutlinedIcon,
  Telegram as TelegramIcon,
  VerifiedUser as VerifiedUserIcon,
} from "@mui/icons-material";

import { ElementLabel, ElementName, IconType } from "~/types";

const iconProperties = (
  text: ElementLabel,
  name: ElementName,
  Element: IconType
) => ({
  Element,
  name,
  text,
});

export const Icon = {
  AccountCircleOutlined: iconProperties(
    "Account",
    "account",
    AccountCircleOutlinedIcon
  ),
  AllChatsOutlined: iconProperties("All Chats", "allChats", ForumOutlinedIcon),
  ArrowBack: iconProperties("Back", "back", ArrowBackIcon),
  AttachFile: iconProperties("Attach File", "attachFile", AttachFileIcon),
  BotOutlined: iconProperties("Bot", "bot", SmartToyOutlinedIcon),
  Calls: iconProperties("Calls", "calls", PermIdentityIcon),
  ChannelsOutlined: iconProperties("Channels", "channels", CallOutlinedIcon),
  Check: iconProperties("Check", "check", CheckIcon),
  Close: iconProperties("Close", "close", CloseIcon),
  Contacts: iconProperties("Contacts", "contacts", PeopleOutlineIcon),
  EditChatsOutlined: iconProperties(
    "Edit Chats",
    "editChats",
    SettingsInputComponentOutlinedIcon
  ),
  EmojiEmotions: iconProperties(
    "Emoji Emotions",
    "emojiEmotions",
    EmojiEmotionsIcon
  ),
  Fingerprint: iconProperties("Fingerprint", "lock", FingerprintIcon),
  Groups: iconProperties("Groups", "groups", CampaignOutlinedIcon),
  LockOutlined: iconProperties("Lock", "lock", LockOutlinedIcon),
  LogoutOutlined: iconProperties("Logout", "logout", LogoutOutlinedIcon),
  Menu: iconProperties("Menu", "menu", MenuIcon),
  MicNone: iconProperties("MicNone", "micNone", MicNoneIcon),
  MoreVertical: iconProperties("More", "more", MoreVertIcon),
  NewChannelOutlined: iconProperties(
    "New Channel",
    "newChannel",
    CallOutlinedIcon
  ),
  NewGroupOutlined: iconProperties(
    "New Group",
    "newGroup",
    CampaignOutlinedIcon
  ),
  NightModeOutlined: iconProperties(
    "Night Mode",
    "nightMode",
    Brightness4OutlinedIcon
  ),
  PersonalOutlined: iconProperties(
    "Personal",
    "personal",
    PersonOutlineOutlinedIcon
  ),
  Search: iconProperties("Search", "search", SearchIcon),
  SettingsOutlined: iconProperties(
    "Settings",
    "settings",
    SettingsOutlinedIcon
  ),
  Send: iconProperties("Send", "send", TelegramIcon),
  UnreadOutlined: iconProperties(
    "Unread Messages",
    "unread",
    AnnouncementOutlinedIcon
  ),
  VerifiedUser: iconProperties("Verified User", "lock", VerifiedUserIcon),
};
