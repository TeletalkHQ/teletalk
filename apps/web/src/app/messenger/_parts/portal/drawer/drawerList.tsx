import { VoidWithArg, VoidWithTwoArgs } from "@repo/types";
import {
	Box,
	CallsIcon,
	ContactsIcon,
	ElementName,
	GeneratedIcon,
	LogoutOutlinedIcon,
	NewChannelOutlinedIcon,
	NewGroupOutlinedIcon,
	NightModeOutlinedIcon,
	SettingsOutlinedIcon,
} from "@repo/ui";
import { MouseEvent } from "react";

type HTMLDivMouseEvent = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;

interface Props {
	toggleDrawer: VoidWithTwoArgs<HTMLDivMouseEvent, boolean>;
	onClick: VoidWithArg<ElementName>;
}

export const DrawerList: React.FC<Props> = ({ toggleDrawer, onClick }) => (
	<Box.List style={{ padding: 10 }}>
		{drawerList.map(({ name, label, Icon, disabled }, index) => (
			<Box.ListItemButton
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
				<Box.ListItemIcon>
					<Icon />
				</Box.ListItemIcon>
				<Box.ListItemText primary={label} />
			</Box.ListItemButton>
		))}
	</Box.List>
);

const drawerList: Array<{
	disabled: boolean;
	name: ElementName;
	Icon: GeneratedIcon;
	label: string;
}> = [
	{
		disabled: true,
		Icon: CallsIcon,
		label: "Calls",
		name: "calls",
	},
	{
		disabled: false,
		Icon: ContactsIcon,
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
		Icon: NewChannelOutlinedIcon,
		name: "channels",
		label: "Channels",
	},
	{
		disabled: true,
		Icon: NewGroupOutlinedIcon,
		name: "newGroup",
		label: "New Group",
	},
	{
		disabled: true,
		Icon: NightModeOutlinedIcon,
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
