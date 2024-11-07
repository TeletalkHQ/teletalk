import { Template } from "~/components";
import { useDialogState, useEmitter } from "~/hooks";
import { useGlobalStore } from "~/store";

import { Actions } from "./actions";
import { Content } from "./content";

const DeleteAvatar = () => {
	const globalStore = useGlobalStore();
	const dialogState = useDialogState("deleteAvatar");
	const { handler, loading } = useEmitter("updateAvatar");

	const handleDelete = () => {
		handler.send(
			{
				avatarSrc: "",
			},
			globalStore.closeDialog
		);
	};

	return (
		<>
			<Template.Dialog
				actions={
					<Actions
						loading={loading}
						onClose={globalStore.closeDialog}
						onDelete={handleDelete}
					/>
				}
				content={<Content />}
				open={dialogState.open}
			/>
		</>
	);
};

export default DeleteAvatar;