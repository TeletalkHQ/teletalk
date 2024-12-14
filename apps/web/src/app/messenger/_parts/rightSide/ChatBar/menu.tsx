"use client";

import { useDialogState } from "@repo/hooks/useDialogState";
import { Div } from "@repo/ui/box/div";
import { Menu } from "@repo/ui/box/menu";
import { MenuItem } from "@repo/ui/box/menuItem";
import { IconButton } from "@repo/ui/button/icon";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

export const ChatBarMenu = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const addContactDialog = useDialogState("addContactByPhone");

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAddToContacts = () => {
		addContactDialog.open();
	};

	const handleRemoveFromContacts = () => {
		// const userItem = userStore.users.find(
		// 	(i) => i.userId === messageStore.selectedChatInfo.userId
		// )!;
		// userStore.updateSelectedUserIdForActions(userItem.userId);
		// globalStore.openDialog("removeContact");
	};

	// const { isContact } = userStore.users.find(
	// 	(i) => i.userId === messageStore.selectedChatInfo.userId
	// ) || { isContact: false };
	const isContact = true;

	const isOpen = !!anchorEl;

	return (
		<Div
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<IconButton
				aria-controls={isOpen ? "long-menu" : undefined}
				aria-expanded={isOpen ? "true" : undefined}
				aria-haspopup="true"
				aria-label="more"
				id="long-button"
				onClick={handleClick}
			>
				<DynamicIcon icon={FiMoreVertical} />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				open={isOpen}
				onClose={handleClose}
			>
				{[
					{
						label: isContact ? "Remove from contacts" : "Add to contacts",
						onClick: isContact ? handleRemoveFromContacts : handleAddToContacts,
					},
				].map((option, index) => (
					<MenuItem
						key={index}
						onClick={() => {
							handleClose();
							option.onClick();
						}}
					>
						{option.label}
					</MenuItem>
				))}
			</Menu>
		</Div>
	);
};
