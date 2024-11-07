import { Template } from "@repo/ui";

import { useDialogState, useEmitter } from "~/hooks";
import { useGlobalStore, useMessageStore, useUserStore } from "~/store";
import { OnInputChange } from "~/types";
import { utils } from "~/utils";

import { Actions } from "./actions";
import { Content } from "./content";
import { Title } from "./title";

const AddContactWithUserId = () => {
	const globalStore = useGlobalStore();
	const userStore = useUserStore();
	const messageStore = useMessageStore();
	const { loading, handler } = useEmitter("addContactWithUserId");
	const dialogState = useDialogState("addContactWithUserId");

	const handleChange: OnInputChange = (e) => {
		userStore.updateAddingContactWithUserId({
			[e.target.name]: e.target.value,
		});
	};

	const isConfirmDisabled = utils.isFullNameValid(
		userStore.addingContactWithUserId
	);

	const handleConfirm = () => {
		handler.send(
			{
				...userStore.addingContactWithUserId,
				userId: messageStore.selectedChatInfo.userId,
			},
			globalStore.closeDialog
		);
	};

	return (
		<>
			<DialogTemplate
				actions={
					<Actions
						isConfirmDisabled={isConfirmDisabled}
						loading={loading}
						onCancel={globalStore.closeDialog}
						onConfirm={handleConfirm}
					/>
				}
				content={
					<Content
						contact={userStore.addingContactWithUserId}
						onChange={handleChange}
					/>
				}
				open={dialogState.open}
				title={<Title />}
			/>
		</>
	);
};

export default AddContactWithUserId;
