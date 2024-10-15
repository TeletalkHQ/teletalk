import { emptyMaker } from "@repo/classes";
import React from "react";

import { Template } from "~/components";
import { useDialogState, useEmitter } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";
import { OnInputChange } from "~/types";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const AddContactWithCellphone = () => {
	const globalStore = useGlobalStore();
	const userStore = useUserStore();
	const { handler, loading } = useEmitter("addContactWithCellphone");
	const dialogState = useDialogState("addContactWithCellphone");

	const handleChange: OnInputChange = (e) => {
		userStore.updateAddingContactWithCellphone({
			[e.target.name]: e.target.value,
		});
	};

	const handleAddClick = () => {
		handler.emitFull(userStore.addingContactWithCellphone, handleClose);
	};

	const handleClose = () => {
		globalStore.closeDialog();
		resetStates();
	};

	const resetStates = () => {
		userStore.updateAddingContactWithCellphone(
			emptyMaker.emptyAddingContactWithCellphone()
		);
	};

	const isSubmitDisabled = utils.isContactWithCellphoneValid(
		userStore.addingContactWithCellphone
	);

	return (
		<>
			<Template.Dialog
				actions={
					<Actions
						isAddContactButtonDisabled={isSubmitDisabled}
						loading={loading}
						onAddContactClick={handleAddClick}
						onCancelClick={handleClose}
					/>
				}
				content={
					<Content
						contact={userStore.addingContactWithCellphone}
						onChange={handleChange}
					/>
				}
				open={dialogState.open}
				paperStyle={{
					height: "50vh",
				}}
				title={<Title />}
				onAfterClose={resetStates}
			/>
		</>
	);
};

export default AddContactWithCellphone;
