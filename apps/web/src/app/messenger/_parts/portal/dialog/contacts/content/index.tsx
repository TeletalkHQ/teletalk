import { useDialogState } from "@repo/hooks/useDialogState";
import { useUserInfo } from "@repo/hooks/useUserInfo";
import { BaseSchema } from "@repo/schema";
import { DialogStore, useDialogStore } from "@repo/store";

import { useContextMenu } from "~/hooks";
import { GlobalStore, useGlobalStore, useUserStore } from "~/store";

import { ListItem } from "./listItem";

interface Props {}

type UuidSetter = Partial<
	Record<DialogStore.DialogName, (id: string | undefined) => void>
>;

export const Content: React.FC<Props> = () => {
	const globalStore = useGlobalStore();
	const openDialog = useDialogStore((state) => state.setOpenDialog);

	const dialogState = useDialogState("contacts");

	const handleContactItemClicked = (id: string) => {
		dialogState.close();
		setUserIdToChat(id);
	};

	// TODO: Refactor - e.g: setUUID({selectedUUID:{to:{removeBlock:...,chat:...,}}})
	const {
		setUserIdForEditContact,
		setUserIdForRemoveContact,
		setUserIdToBlock,
		setUserIdToChat,
		setUserIdToUnblock,
	} = useUserStore((state) => ({
		setUserIdForEditContact: state.setUserIdForEditContact,
		setUserIdForRemoveContact: state.setUserIdForRemoveContact,
		setUserIdToBlock: state.setUserIdToBlock,
		setUserIdToChat: state.setUserIdToChat,
		setUserIdToUnblock: state.setUserIdToUnblock,
	}));

	const {
		data: {
			userInfo: { contacts, blacklist },
		},
	} = useUserInfo();

	const createContextMenuList = (
		contact?: BaseSchema.ContactsItem
	): GlobalStore.ContextMenuList => {
		const isBlocked = blacklist.some((item) => item.userId === contact?.userId);

		return [
			{
				text: "Edit",
				handler: onContextMenuHandler("editContact", contact?.userId),
			},
			{
				text: "Remove",
				handler: onContextMenuHandler("removeContact", contact?.userId),
			},
			{
				text: `${isBlocked ? "Unblock" : "Block"}`,
				handler: onContextMenuHandler(
					isBlocked ? "removeBlock" : "addBlock",
					contact?.userId
				),
			},
		];
	};

	const onContextMenuHandler =
		(dn: DialogStore.DialogName, id: string | undefined) => () => {
			globalStore.closeContextMenu();
			openDialog(dn);

			const uuidSetter: UuidSetter = {
				addBlock: setUserIdToBlock,
				editContact: setUserIdForEditContact,
				removeBlock: setUserIdToUnblock,
				removeContact: setUserIdForRemoveContact,
			};

			uuidSetter[dn]?.(id);
		};

	const { onContextMenu } = useContextMenu(createContextMenuList());

	const handleContextMenu: GlobalStore.ExtendedOnContextMenu<
		BaseSchema.ContactsItem
	> = (event, contact) => {
		onContextMenu(event, createContextMenuList(contact));
	};

	return (
		<>
			{contacts.map((item, index) => (
				<ListItem
					key={index}
					fullName={`${item.firstName} ${item.lastName}`}
					lastSeen=""
					userId={item.userId}
					onContactClick={() => handleContactItemClicked(item.userId)}
					onContextMenu={(e) => {
						handleContextMenu(e, item);
					}}
				/>
			))}
		</>
	);
};
