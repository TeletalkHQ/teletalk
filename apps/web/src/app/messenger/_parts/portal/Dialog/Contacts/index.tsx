import { UserItem } from "@repo/types";

import { useContextMenu, useDialogState } from "~/hooks";
import {
	GlobalStore,
	useGlobalStore,
	useMessageStore,
	useUserStore,
} from "~/store";

import { Actions } from "./actions";
import { Content } from "./content";
import { Title } from "./title";

export const Contacts = () => {
	const globalStore = useGlobalStore();
	const messageStore = useMessageStore();
	const userStore = useUserStore();
	const dialogState = useDialogState("contacts");

	const createContextMenuList = ({
		isBlocked,
	}: Partial<UserItem> = {}): GlobalStore.ContextMenuList => [
		{
			text: "Edit",
			handler: onContextMenuHandler("editContactWithCellphone"),
		},
		{
			text: "Remove",
			handler: onContextMenuHandler("removeContact"),
		},
		{
			text: `${isBlocked ? "Unblock" : "Block"}`,
			handler: onContextMenuHandler("addBlock"),
		},
	];

	const onContextMenuHandler = (dn: GlobalStore.DialogName) => () => {
		globalStore.closeContextMenu();
		globalStore.openDialog(dn);
	};

	const { onContextMenu } = useContextMenu(createContextMenuList());

	const handleAddContactClick = () => {
		globalStore.openDialog("addContact");
	};

	const handleContactItemClicked = (contact: UserItem) => {
		globalStore.closeDialog();
		messageStore.updateSelectedChatInfo({
			userId: contact.userId,
			chatId: "",
		});
	};

	const handleContextMenu: GlobalStore.ExtendedOnContextMenu<UserItem> = (
		event,
		u
	) => {
		userStore.updateSelectedUserIdForActions(u.userId);
		onContextMenu(event, createContextMenuList(u));
	};

	return (
		<DialogTemplate
			actions={
				<Actions
					onAddContactClick={handleAddContactClick}
					onClose={globalStore.closeDialog}
				/>
			}
			content={
				<Content
					contacts={userStore.users.filter((i) => i.isContact)}
					onContactItemClicked={handleContactItemClicked}
					onContextMenu={handleContextMenu}
				/>
			}
			open={dialogState.open}
			paperStyle={{
				height: "90vh",
			}}
			title={<Title />}
		/>
	);
};
