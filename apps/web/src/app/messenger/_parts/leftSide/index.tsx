import { Flex } from "@repo/ui/box/flex";
import { Grid } from "@repo/ui/box/grid";
import { List } from "@repo/ui/box/list";

import { useGlobalStore } from "~/store/global";

import { ChatList } from "./ChatList";
import { SearchBar } from "./SearchBar";
import { SideBarList } from "./SideBarList";

export const LeftSide = () => {
	const globalStore = useGlobalStore();

	const handleDrawerIconClick = () => {
		globalStore.updateIsDrawerOpen(true);
	};

	return (
		<>
			<Grid
				container
				item
				lg={3}
				md={4}
				sm={12}
				style={{
					height: "100vh",
				}}
			>
				<Flex col style={{ width: "100%", height: "100%" }}>
					<SearchBar onDrawerIconClick={handleDrawerIconClick} />
					<SideBarList />

					<List
						sx={{
							overflowY: "auto",
							padding: "5px",
							scrollBehavior: "smooth",
							width: "100%",
						}}
					>
						<ChatList />
					</List>
				</Flex>
			</Grid>
		</>
	);
};
