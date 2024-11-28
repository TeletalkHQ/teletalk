import { VoidWithArg, VoidWithTwoArgs } from "@repo/types";
import {
	CallsIcon,
	ContactsIcon,
	ElementName,
	GeneratedIcon,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
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
