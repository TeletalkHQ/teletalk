import { useDialogState } from "@repo/hooks";
import { DialogTemplate, TripleAction } from "@repo/ui";

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
						leftProps={{
							children: "Close",
							onClick: dialogState.close,
						}}
						middleProps={{
							children: "Edit",
							onClick: handleEdit,
						}}
						rightProps={{
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
