import { type VoidWithArg } from "@repo/types";
import { List } from "@repo/ui/box/list";
import { ListItemButton } from "@repo/ui/box/listItemButton";
import { ListItemIcon } from "@repo/ui/box/listItemIcon";
import { ListItemText } from "@repo/ui/box/listItemText";
import {
	DynamicIcon,
	type IconComponentType,
} from "@repo/ui/icons/dynamicIcon";
import { type ElementName } from "@repo/ui/types";
import { type MouseEvent } from "react";
import { BsTelephone } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { GrGroup } from "react-icons/gr";
import { IoLogOutOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { RiAccountCircle2Line } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";

type HTMLDivMouseEvent = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;

interface Props {
	toggleDrawer: (e: HTMLDivMouseEvent, val: boolean) => void;
	onClick: VoidWithArg<ElementName>;
}

export const DrawerList: React.FC<Props> = ({ toggleDrawer, onClick }) => (
	<List style={{ padding: 10 }}>
		{drawerList.map(({ disabled, Icon, label, name }, index) => (
			<ListItemButton
				key={index}
				disabled={disabled}
				style={{
					alignItems: "center",
					borderRadius: "10px",
					height: "40px",
				}}
				onClick={(event) => {
					toggleDrawer(event, false);
					onClick(name);
				}}
			>
				<ListItemIcon>
					<DynamicIcon icon={Icon} />
				</ListItemIcon>
				<ListItemText primary={label} />
			</ListItemButton>
		))}
	</List>
);

const drawerList: Array<{
	disabled: boolean;
	name: ElementName;
	Icon: IconComponentType;
	label: string;
}> = [
	{
		disabled: true,
		Icon: GrGroup,
		label: "New Group",
		name: "newGroup",
	},
	{
		disabled: true,
		Icon: TfiAnnouncement,
		label: "New Channel",
		name: "channels",
	},
	{
		disabled: false,
		Icon: RiAccountCircle2Line,
		label: "Contacts",
		name: "contacts",
	},
	{
		disabled: true,
		Icon: BsTelephone,
		label: "Calls",
		name: "calls",
	},
	{
		disabled: true,
		Icon: CiBookmark,
		label: "Saved Messages",
		name: "calls",
	},
	{
		disabled: false,
		Icon: LuSettings,
		name: "settings",
		label: "Settings",
	},
	{
		disabled: true,
		Icon: CiDark,
		name: "nightMode",
		label: "Night Mode",
	},
	{
		disabled: false,
		Icon: IoLogOutOutline,
		name: "logout",
		label: "Log out",
	},
];
