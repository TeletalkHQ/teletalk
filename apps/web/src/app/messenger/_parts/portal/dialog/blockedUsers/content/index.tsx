import { List } from "@repo/ui/box/list";

interface Props {}

export const Content: React.FC<Props> = () => {
	return (
		<List>
			{/* {userStore.users
				.filter((item) => item.isBlocked)
				.map((item, index) => (
					<ListItem
						key={index}
						userItem={item}
						onItemLick={() => onItemLick(item.userId)}
					/>
				))} */}
		</List>
	);
};
