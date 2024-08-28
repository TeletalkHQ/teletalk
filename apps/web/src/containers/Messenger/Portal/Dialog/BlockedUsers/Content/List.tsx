import type { UserId, VoidWithArg } from "@repo/types";

import { Box } from "~/components";
import { useUserStore } from "~/store";

import ListItem from "./ListItem";

interface Props {
	onItemLick: VoidWithArg<UserId>;
}

const List: React.FC<Props> = ({ onItemLick }) => {
	const userStore = useUserStore();

	return (
		<Box.List>
			{userStore.users
				.filter((item) => item.isBlocked)
				.map((item, index) => (
					<ListItem
						key={index}
						userItem={item}
						onItemLick={() => onItemLick(item.userId)}
					/>
				))}
		</Box.List>
	);
};

export default List;
