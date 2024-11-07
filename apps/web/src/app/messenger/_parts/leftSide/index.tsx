import { Box } from "@repo/ui";

import { useGlobalStore } from "~/store/global";

import ChatList from "./ChatList";
import SearchBar from "./SearchBar";

const LeftSide = () => {
	const globalStore = useGlobalStore();

	const handleDrawerIconClick = () => {
		globalStore.changeDrawerOpen(true);
	};

	return (
		<>
			<Box.Grid
				container
				item
				lg={3}
				md={4}
				sm={12}
				style={{
					height: "100vh",
				}}
			>
				<Box.Flex col style={{ width: "100%", height: "100%" }}>
					<SearchBar onDrawerIconClick={handleDrawerIconClick} />

					<Box.List
						sx={{
							overflowY: "auto",
							padding: "5px",
							scrollBehavior: "smooth",
							width: "100%",
						}}
					>
						<ChatList />
					</Box.List>
				</Box.Flex>
			</Box.Grid>
		</>
	);
};

export default LeftSide;
