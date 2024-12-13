import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { Paper } from "@repo/ui/box/paper";

import { Searchbar } from "./Searchbar";
import { ChatList } from "./chatList";
import { Sidebar } from "./sidebar";

export const LeftSide = () => {
	return (
		<Paper className="flex w-full max-w-sm flex-col rounded-lg p-2">
			<Flex className="h-full w-full gap-2">
				<Sidebar />

				<Div className="flex flex-col w-full">
					<Searchbar />
					<ChatList />
				</Div>
			</Flex>
		</Paper>
	);
};
