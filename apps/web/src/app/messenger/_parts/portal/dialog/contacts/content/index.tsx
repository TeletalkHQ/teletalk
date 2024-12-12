import { useDialogState } from "@repo/hooks/useDialogState";
import { useUserInfo } from "@repo/hooks/useUserInfo";
import { type BaseSchema } from "@repo/schema";
import type { DialogStore } from "@repo/store";
import { useDialogStore } from "@repo/store";
import { List } from "@repo/ui/box/list";

import { useContextMenu } from "~/hooks/utils/useContextMenu";
import { type GlobalStore, useGlobalStore, useUserStore } from "~/store";

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
		setSelectedUUID("chat", id);
	};

	const setSelectedUUID = useUserStore((state) => state.setSelectedUUID);

	const {
		data: {
			userInfo: { contacts, blacklist },
		},
	} = useUserInfo();

	const onContextMenuHandler =
		(dn: DialogStore.DialogName, id: string | undefined) => () => {
			globalStore.closeContextMenu();
			openDialog(dn);

			const uuidSetter: UuidSetter = {
				addBlock: (id) => setSelectedUUID("block", id),
				editContact: (id) => setSelectedUUID("editContact", id),
				removeBlock: (id) => setSelectedUUID("unblock", id),
				removeContact: (id) => setSelectedUUID("removeContact", id),
			};

			uuidSetter[dn]?.(id);
		};

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

	const { onContextMenu } = useContextMenu(createContextMenuList());

	const handleContextMenu: GlobalStore.ExtendedOnContextMenu<
		BaseSchema.ContactsItem
	> = (event, contact) => {
		onContextMenu(event, createContextMenuList(contact));
	};

	return (
		<List className="max-w-lg w-full">
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
		</List>
	);
};
