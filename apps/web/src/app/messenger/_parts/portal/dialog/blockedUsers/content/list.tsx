import type { UserId, VoidWithArg } from "@repo/types";
import { Box } from "@repo/ui";

import { useUserStore } from "~/store";

import ListItem from "./listItem";

interface Props {
	onItemLick: VoidWithArg<UserId>;
}

export const List: React.FC<Props> = ({ onItemLick }) => {
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
