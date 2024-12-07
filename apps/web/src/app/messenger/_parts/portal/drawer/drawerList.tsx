import { VoidWithArg } from "@repo/types";
import { List } from "@repo/ui/box/list";
import { ListItemButton } from "@repo/ui/box/listItemButton";
import { ListItemIcon } from "@repo/ui/box/listItemIcon";
import { ListItemText } from "@repo/ui/box/listItemText";
import { CallOutlinedIcon } from "@repo/ui/icons/callOutlined";
import { LogoutOutlinedIcon } from "@repo/ui/icons/logoutOutlined";
import { SettingsOutlinedIcon } from "@repo/ui/icons/settingsOutlined";
import { GeneratedIcon } from "@repo/ui/icons/utils";
import { ElementName } from "@repo/ui/types";
import { MouseEvent } from "react";

type HTMLDivMouseEvent = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;

interface Props {
	toggleDrawer: (e: HTMLDivMouseEvent, val: boolean) => void;
	onClick: VoidWithArg<ElementName>;
}

export const DrawerList: React.FC<Props> = ({ toggleDrawer, onClick }) => (
	<List style={{ padding: 10 }}>
		{drawerList.map(({ name, label, Icon, disabled }, index) => (
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
					<Icon />
				</ListItemIcon>
				<ListItemText primary={label} />
			</ListItemButton>
		))}
	</List>
);

const drawerList: Array<{
	disabled: boolean;
	name: ElementName;
	Icon: GeneratedIcon;
	label: string;
}> = [
	{
		disabled: true,
		Icon: CallOutlinedIcon,
		label: "Calls",
		name: "calls",
	},
	{
		disabled: false,
		Icon: CallOutlinedIcon,
		name: "contacts",
		label: "Contacts",
	},
	{
		disabled: false,
		Icon: LogoutOutlinedIcon,
		name: "logout",
		label: "Logout",
	},
	{
		disabled: true,
		Icon: CallOutlinedIcon,
		name: "channels",
		label: "Channels",
	},
	{
		disabled: true,
		Icon: CallOutlinedIcon,
		name: "newGroup",
		label: "New Group",
	},
	{
		disabled: true,
		Icon: CallOutlinedIcon,
		name: "nightMode",
		label: "Night Mode",
	},
	{
		disabled: false,
		Icon: SettingsOutlinedIcon,
		name: "settings",
		label: "Settings",
	},
];
