import { ElementName, VoidWithArg, VoidWithTwoArgs } from "@repo/types";
import { MouseEvent } from "react";

import { Box, Icon } from "~/components";

type HTMLDivMouseEvent = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;

const drawerList = [
	{
		disabled: true,
		Icon: Icon.Calls,
	},
	{
		disabled: false,
		Icon: Icon.Contacts,
	},
	{
		disabled: false,
		Icon: Icon.LogoutOutlined,
	},
	{
		disabled: true,
		Icon: Icon.NewChannelOutlined,
	},
	{
		disabled: true,
		Icon: Icon.NewGroupOutlined,
	},
	{
		disabled: true,
		Icon: Icon.NightModeOutlined,
	},
	{
		disabled: false,
		Icon: Icon.SettingsOutlined,
	},
];

interface Props {
	toggleDrawer: VoidWithTwoArgs<HTMLDivMouseEvent, boolean>;
	onClick: VoidWithArg<ElementName>;
}

const DrawerList: React.FC<Props> = ({ toggleDrawer, onClick }) => (
	<Box.List style={{ padding: 10 }}>
		{drawerList.map(({ Icon, disabled }, index) => (
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
					onClick(Icon.name);
				}}
			>
				<Box.ListItemIcon>
					<Icon.Element />
				</Box.ListItemIcon>
				<Box.ListItemText primary={Icon.text} />
			</Box.ListItemButton>
		))}
	</Box.List>
);

export default DrawerList;
