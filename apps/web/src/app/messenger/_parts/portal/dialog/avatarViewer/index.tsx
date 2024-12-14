"use client";

import { useDialogState } from "@repo/hooks/useDialogState";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { TripleAction } from "@repo/ui/template/tripleAction";

import { Content } from "./content";

export const AvatarViewer = () => {
	const dialogState = useDialogState("avatarViewer");
	const deleteAvatarDialog = useDialogState("deleteAvatar");
	const avatarSelectorDialog = useDialogState("avatarSelector");

	const handleDelete = () => {
		deleteAvatarDialog.open();
	};

	const handleEdit = () => {
		avatarSelectorDialog.open();
	};

	return (
		<>
			<DialogTemplate
				actions={
					<TripleAction
						leftButtonProps={{
							children: "Close",
							onClick: dialogState.close,
						}}
						middleButtonProps={{
							children: "Edit",
							onClick: handleEdit,
						}}
						rightButtonProps={{
							children: "Delete",
							color: "error",
							onClick: handleDelete,
						}}
					/>
				}
				content={<Content />}
				dialogState={dialogState}
			/>
		</>
	);
};
