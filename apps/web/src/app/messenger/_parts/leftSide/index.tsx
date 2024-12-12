import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";

import { ChatList } from "./chatList";
import { SearchBar } from "./searchBar";
import { Sidebar } from "./sidebar";

export const LeftSide = () => {
	return (
		<Flex col>
			<Flex className="h-full w-full gap-2">
				<Sidebar />

				<Div className="flex flex-col gap-1">
					<SearchBar />
					<ChatList />
				</Div>
			</Flex>
		</Flex>
	);
};
