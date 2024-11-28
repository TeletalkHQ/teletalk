import {
	AccountBox,
	AccountBoxTwoTone,
	AccountCircleOutlined,
	AlternateEmailTwoTone,
	AnnouncementOutlined,
	ArrowBack,
	AttachFile,
	Block,
	Brightness4Outlined,
	Call,
	CallOutlined,
	CallTwoTone,
	CampaignOutlined,
	Chat,
	Check,
	Circle,
	CircleNotifications,
	Close,
	Devices,
	DoneAll,
	EmojiEmotions,
	Fingerprint,
	ForumOutlined,
	Language,
	Lock,
	LockOpenTwoTone,
	LockOutlined,
	LogoutOutlined,
	Menu,
	MicNone,
	MoreVert,
	PeopleOutline,
	PermIdentity,
	PersonOutlineOutlined,
	PieChart,
	PushPinTwoTone,
	Search,
	SettingsAccessibilityTwoTone,
	SettingsInputComponentOutlined,
	SettingsOutlined,
	SmartToyOutlined,
	Storage,
	Telegram,
	VerifiedUser,
} from "@mui/icons-material";

import { ElementLabel, ElementName } from "../../types";
import { DynamicIcon, DynamicIconProps, MuiIconType } from "./dynamicIcon";

export type IconType = "svg" | "mui";

export type IconComponentType = () => JSX.Element;

type IconSchema = {
	label: ElementLabel;
	name: ElementName;
	Icon: MuiIconType;
	type: IconType;
};

export type GeneratedIcon = React.FC<Omit<DynamicIconProps, "Icon">>;

const generateIcon = ({ Icon }: IconSchema) => {
	// if (type === "mui")
	return function MuiIcon(p: Omit<DynamicIconProps, "Icon">) {
		return <DynamicIcon Icon={Icon} {...p} />;
	};
};

export const CircleIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: Circle,
	type: "mui",
});

export const DoneAllIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: DoneAll,
	type: "mui",
});

export const AccountBoxIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: AccountBox,
	type: "mui",
});
export const CallIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: Call,
	type: "mui",
});
export const ChatIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: Chat,
	type: "mui",
});
export const CircleNotificationsIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: CircleNotifications,
	type: "mui",
});
export const LanguageIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: Language,
	type: "mui",
});
export const LockIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: Lock,
	type: "mui",
});
export const PieChartIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: PieChart,
	type: "mui",
});
export const StorageIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: Storage,
	type: "mui",
});
export const BlockIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: Block,
	type: "mui",
});

export const DevicesIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: Devices,
	type: "mui",
});

export const AccountCircleOutlinedIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: AccountCircleOutlined,
	type: "mui",
});

export const LockOpenTwoToneIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: LockOpenTwoTone,
	type: "mui",
});

export const PushPinTwoToneIcon = generateIcon({
	label: "Account",
	name: "account",
	Icon: PushPinTwoTone,
	type: "mui",
});

export const AllChatsOutlinedIcon = generateIcon({
	label: "All Chats",
	name: "allChats",
	Icon: ForumOutlined,
	type: "mui",
});
export const ArrowBackIcon = generateIcon({
	label: "Back",
	name: "back",
	Icon: ArrowBack,
	type: "mui",
});

export const AttachFileIcon = generateIcon({
	label: "Attach File",
	name: "attachFile",
	Icon: AttachFile,
	type: "mui",
});
export const BotOutlinedIcon = generateIcon({
	label: "Bot",
	name: "bot",
	Icon: SmartToyOutlined,
	type: "mui",
});

export const CallsIcon = generateIcon({
	label: "Calls",
	name: "calls",
	Icon: PermIdentity,
	type: "mui",
});

export const ChannelsOutlinedIcon = generateIcon({
	label: "Channels",
	name: "channels",
	Icon: CallOutlined,
	type: "mui",
});
export const CheckIcon = generateIcon({
	label: "Check",
	name: "check",
	Icon: Check,
	type: "mui",
});

export const CloseIcon = generateIcon({
	label: "Close",
	name: "close",
	Icon: Close,
	type: "mui",
});

export const ContactsIcon = generateIcon({
	label: "Contacts",
	name: "contacts",
	Icon: PeopleOutline,
	type: "mui",
});

export const EditChatsOutlinedIcon = generateIcon({
	label: "Edit Chats",
	name: "editChats",
	Icon: SettingsInputComponentOutlined,
	type: "mui",
});

export const EmojiEmotionsIcon = generateIcon({
	label: "Emoji Emotions",
	name: "emojiEmotions",
	Icon: EmojiEmotions,
	type: "mui",
});
export const FingerprintIcon = generateIcon({
	label: "Fingerprint",
	name: "lock",
	Icon: Fingerprint,
	type: "mui",
});

export const GroupsIcon = generateIcon({
	label: "Groups",
	name: "groups",
	Icon: CampaignOutlined,
	type: "mui",
});

export const LockOutlinedIcon = generateIcon({
	label: "Lock",
	name: "lock",
	Icon: LockOutlined,
	type: "mui",
});

export const LogoutOutlinedIcon = generateIcon({
	label: "Logout",
	name: "logout",
	Icon: LogoutOutlined,
	type: "mui",
});
export const MenuIcon = generateIcon({
	label: "Menu",
	name: "menu",
	Icon: Menu,
	type: "mui",
});

export const MicNoneIcon = generateIcon({
	label: "MicNone",
	name: "micNone",
	Icon: MicNone,
	type: "mui",
});

export const MoreVerticalIcon = generateIcon({
	label: "More",
	name: "more",
	Icon: MoreVert,
	type: "mui",
});

export const NewChannelOutlinedIcon = generateIcon({
	label: "New Channel",
	name: "newChannel",
	Icon: CallOutlined,
	type: "mui",
});

export const NewGroupOutlinedIcon = generateIcon({
	label: "New Group",
	name: "newGroup",
	Icon: CampaignOutlined,
	type: "mui",
});
export const NightModeOutlinedIcon = generateIcon({
	label: "Night Mode",
	name: "nightMode",
	Icon: Brightness4Outlined,
	type: "mui",
});

export const PersonalOutlinedIcon = generateIcon({
	label: "Personal",
	name: "personal",
	Icon: PersonOutlineOutlined,
	type: "mui",
});
export const SearchIcon = generateIcon({
	label: "Search",
	name: "search",
	Icon: Search,
	type: "mui",
});

export const SettingsOutlinedIcon = generateIcon({
	label: "Settings",
	name: "settings",
	Icon: SettingsOutlined,
	type: "mui",
});
export const SendIcon = generateIcon({
	label: "Send",
	name: "send",
	Icon: Telegram,
	type: "mui",
});

export const UnreadOutlinedIcon = generateIcon({
	label: "Unread Messages",
	name: "unread",
	Icon: AnnouncementOutlined,
	type: "mui",
});

export const VerifiedUserIcon = generateIcon({
	label: "Verified User",
	name: "lock",
	Icon: VerifiedUser,
	type: "mui",
});

export const AccountBoxTwoToneIcon = generateIcon({
	label: "Account Box",
	name: "account",
	Icon: AccountBoxTwoTone,
	type: "mui",
});

export const AlternateEmailTwoToneIcon = generateIcon({
	label: "Verified User",
	name: "lock",
	Icon: AlternateEmailTwoTone,
	type: "mui",
});

export const CallTwoToneIcon = generateIcon({
	label: "Verified User",
	name: "lock",
	Icon: CallTwoTone,
	type: "mui",
});

export const SettingsAccessibilityTwoToneIcon = generateIcon({
	label: "Verified User",
	name: "lock",
	Icon: SettingsAccessibilityTwoTone,
	type: "mui",
});

export * from "./dynamicIcon";
