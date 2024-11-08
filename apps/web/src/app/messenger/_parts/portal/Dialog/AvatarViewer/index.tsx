import { useDialogState } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";

import { Actions } from "./actions";
import { Content } from "./content";

export const AvatarViewer = () => {
	const globalStore = useGlobalStore();
	const dialogState = useDialogState("avatarViewer");
	const userStore = useUserStore();

	const handleDelete = () => {
		globalStore.openDialog("deleteAvatar");
	};

	const handleEdit = () => {
		globalStore.openDialog("avatarSelector");
	};

	return (
		<>
			<DialogTemplate
				actions={
					<Actions
						onClose={globalStore.closeDialog}
						onDelete={handleDelete}
						onEdit={handleEdit}
					/>
				}
				content={<Content avatarSrc={userStore.currentUserData.avatarSrc} />}
				open={dialogState.open}
			/>
		</>
	);
};
