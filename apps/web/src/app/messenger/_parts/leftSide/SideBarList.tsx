import {
	AllChatsOutlinedIcon,
	BotOutlinedIcon,
	ChannelsOutlinedIcon,
	EditChatsOutlinedIcon,
	GroupsIcon,
	List,
	ListItemButton,
	PersonalOutlinedIcon,
	UnreadOutlinedIcon,
} from "@repo/ui";

const sidebarList = [
	AllChatsOutlinedIcon,
	UnreadOutlinedIcon,
	PersonalOutlinedIcon,
	ChannelsOutlinedIcon,
	GroupsIcon,
	BotOutlinedIcon,
	EditChatsOutlinedIcon,
];

export const SideBarList = () => {
	return (
		<>
			<List sx={{ width: "20%" }}>
				{sidebarList.map((Icon, index) => {
					return (
						//TODO: Flex list Item
						<ListItemButton
							key={index}
							selected={index === 4}
							sx={{
								display: "flex",
								flexDirection: "column",
								height: "65px",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Icon />
						</ListItemButton>
					);
				})}
			</List>
		</>
	);
};
