"use client";

import { useDialogState } from "@repo/hooks";
import { Box, IconButton, MoreVerticalIcon } from "@repo/ui";
import { useState } from "react";

export const ChatBarMenu = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const addContactDialog = useDialogState("addContact");

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
		<Box.Div
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
				<MoreVerticalIcon />
			</IconButton>
			<Box.Menu
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
					<Box.MenuItem
						key={index}
						onClick={() => {
							handleClose();
							option.onClick();
						}}
					>
						{option.label}
					</Box.MenuItem>
				))}
			</Box.Menu>
		</Box.Div>
	);
};
