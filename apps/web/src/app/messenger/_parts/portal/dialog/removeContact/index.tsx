import { userUtils } from "@repo/classes";

import {
	useDialogState,
	useEmitter,
	useFindSelectedUserForActions,
} from "~/hooks";
import { useGlobalStore } from "~/store";

import { Actions } from "./actions";
import { Content } from "./content";

export const RemoveContact = () => {
	const globalStore = useGlobalStore();
	const dialogState = useDialogState("removeContact");
	const selectedUserForActions = useFindSelectedUserForActions();
	const { handler, loading } = useEmitter("removeContact");

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
