import { List, ListItemButton } from "@repo/ui";
import { AccountBoxIcon } from "@repo/ui/accountBox";

const sidebarList = [
	AccountBoxIcon,
	AccountBoxIcon,
	AccountBoxIcon,
	AccountBoxIcon,
	AccountBoxIcon,
	AccountBoxIcon,
	AccountBoxIcon,
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
