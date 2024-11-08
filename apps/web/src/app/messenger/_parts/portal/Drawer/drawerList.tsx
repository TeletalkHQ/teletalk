import { VoidWithArg, VoidWithTwoArgs } from "@repo/types";
import { Box, ElementName, Icons } from "@repo/ui";
import { MouseEvent } from "react";

type HTMLDivMouseEvent = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;

const drawerList = [
	{
		disabled: true,
		Icon: Icons.Calls,
	},
	{
		disabled: false,
		Icon: Icons.Contacts,
	},
	{
		disabled: false,
		Icon: Icons.LogoutOutlined,
	},
	{
		disabled: true,
		Icon: Icons.NewChannelOutlined,
	},
	{
		disabled: true,
		Icon: Icons.NewGroupOutlined,
	},
	{
		disabled: true,
		Icon: Icons.NightModeOutlined,
	},
	{
		disabled: false,
		Icon: Icons.SettingsOutlined,
	},
];

interface Props {
	toggleDrawer: VoidWithTwoArgs<HTMLDivMouseEvent, boolean>;
	onClick: VoidWithArg<ElementName>;
}

export const DrawerList: React.FC<Props> = ({ toggleDrawer, onClick }) => (
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
