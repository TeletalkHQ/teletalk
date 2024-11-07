import { userUtils } from "@repo/classes";
import { Template } from "@repo/ui";

import {
	useDialogState,
	useEmitter,
	useFindSelectedUserForActions,
} from "~/hooks";
import { useGlobalStore } from "~/store";

import { Actions } from "./actions";
import { Content } from "./content";

const BlockUser = () => {
	const globalStore = useGlobalStore();
	const dialogState = useDialogState("addBlock");
	const selectedUserForActions = useFindSelectedUserForActions();

	const { handler: addBlockHandler, loading: addBlockLoading } =
		useEmitter("addBlock");

	const { handler: removeBlockHandler, loading: removeBlockLoading } =
		useEmitter("removeBlock");

	const handleConfirm = () => {
		(selectedUserForActions.isBlocked
			? removeBlockHandler
			: addBlockHandler
		).send(
			{
				userId: selectedUserForActions.userId,
			},
			globalStore.closeDialog
		);
	};

	const loading = addBlockLoading || removeBlockLoading;

	return (
		<>
			<Template.Dialog
				actions={
					<Actions
						loading={loading}
						onCancel={globalStore.closeDialog}
						onConfirm={handleConfirm}
					/>
				}
				content={
					<Content
						fullName={userUtils.concatFirstNameWithLastName(
							selectedUserForActions
						)}
					/>
				}
				open={dialogState.open}
			/>
		</>
	);
};

export default BlockUser;
