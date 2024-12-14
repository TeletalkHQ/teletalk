import { useDialogState } from "@repo/hooks/useDialogState";
import { useUserInfo } from "@repo/hooks/useUserInfo";
import { type BaseSchema } from "@repo/schema";
import type { DialogStore } from "@repo/store";
import { useDialogStore } from "@repo/store";
import { Div } from "@repo/ui/box/div";
import { List } from "@repo/ui/box/list";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { TextField } from "@repo/ui/input/textField";
import type { OnTextInputChange } from "@repo/ui/types";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

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
	const [search, setSearch] = useState("");

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

	const handleSearchChange: OnTextInputChange = (e) => {
		setSearch(e.target.value);
	};

	return (
		<Div className="flex flex-col gap-2 w-full">
			<TextField
				name="search-contact"
				placeholder="Search"
				size="small"
				slotProps={{
					input: {
						startAdornment: <DynamicIcon icon={CiSearch} />,
					},
				}}
				value={search}
				onChange={handleSearchChange}
			/>

			<List className="w-full">
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
		</Div>
	);
};
