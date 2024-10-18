import { Template } from "~/components";
import { useDialogState, useEmitter } from "~/hooks";
import { useGlobalStore, useMessageStore, useUserStore } from "~/store";
import { OnInputChange } from "~/types";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

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
			<Template.Dialog
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
