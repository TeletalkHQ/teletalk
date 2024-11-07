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

const RemoveBlock = () => {
	const globalStore = useGlobalStore();
	const selectedUserForActions = useFindSelectedUserForActions();
	const dialogState = useDialogState("removeBlock");
	const { handler, loading } = useEmitter("removeBlock");

	const handleRemoveContact = () => {
		handler.send(
			{
				userId: selectedUserForActions.userId,
			},
			() => {
				globalStore.closeDialog();
			}
		);
	};

	return (
		<>
			<DialogTemplate
				actions={
					<Actions
						loading={loading}
						onClose={globalStore.closeDialog}
						onRemove={handleRemoveContact}
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

export default RemoveBlock;
