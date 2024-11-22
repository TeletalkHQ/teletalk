import { Box } from "@repo/ui";

interface Props {}

export const Content: React.FC<Props> = () => {
	return (
		<Box.List>
			{/* {userStore.users
				.filter((item) => item.isBlocked)
				.map((item, index) => (
					<ListItem
						key={index}
						userItem={item}
						onItemLick={() => onItemLick(item.userId)}
					/>
				))} */}
		</Box.List>
	);
};
