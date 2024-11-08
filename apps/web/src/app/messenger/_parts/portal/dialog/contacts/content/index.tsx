import { UserItem, Users, VoidWithArg } from "@repo/types";

import { GlobalStore } from "~/store";

import { ListItem } from "./listItem";

interface Props {
	contacts: Users;
	onContactItemClicked: VoidWithArg<UserItem>;
	onContextMenu: GlobalStore.ExtendedOnContextMenu<UserItem>;
}

export const Content: React.FC<Props> = ({
	contacts,
	onContactItemClicked,
	onContextMenu,
}) => {
	return (
		<>
			{contacts.map((item, index) => (
				<ListItem
					key={index}
					fullName={`${item.firstName} ${item.lastName}`}
					lastSeen=""
					userId={item.userId}
					onContactClick={() => onContactItemClicked(item)}
					onContextMenu={(e) => {
						onContextMenu(e, item);
					}}
				/>
			))}
		</>
	);
};
