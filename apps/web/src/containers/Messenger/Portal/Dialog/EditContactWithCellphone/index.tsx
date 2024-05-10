import { maker } from "@repo/classes";
import { extractor } from "@repo/classes";
import type { FullName } from "@repo/type-store";
import React, { useEffect, useState } from "react";

import { Template } from "~/components";
import {
	useDialogState,
	useEmitter,
	useFindSelectedUserForActions,
} from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";
import { OnInputChange } from "~/types";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const EditContactWithCellphone = () => {
	const globalStore = useGlobalStore();
	const userStore = useUserStore();
	const dialogState = useDialogState("editContactWithCellphone");
	const { handler, loading } = useEmitter("updateContact");
	const selectedUserForActions = useFindSelectedUserForActions();
	const [fullName, setFullName] = useState<FullName>(maker.emptyFullName());

	useEffect(() => {
		if (dialogState.open)
			setFullName(extractor.fullName(selectedUserForActions));
	}, [dialogState.open, selectedUserForActions, selectedUserForActions.userId]);

	const handleInputChange: OnInputChange = (e) => {
		setFullName({
			...fullName,
			[e.target.name]: e.target.value,
		});
	};

	const handleAddContactClick = () => {
		handler.emitFull(
			{
				...extractor.fullName(fullName),
				userId: selectedUserForActions.userId,
			},
			handleClose
		);
	};

	const handleClose = () => {
		globalStore.closeDialog();
		resetStates();
	};

	const resetStates = () => {
		userStore.updateSelectedUserIdForActions("");
		setFullName(maker.emptyFullName());
	};

	const isSubmitDisabled = utils.isFullNameValid(fullName);

	return (
		<>
			<Template.Dialog
				actions={
					<Actions
						isAddContactButtonDisabled={isSubmitDisabled}
						loading={loading}
						onAddContactClick={handleAddContactClick}
						onCancel={handleClose}
					/>
				}
				content={<Content fullName={fullName} onChange={handleInputChange} />}
				open={dialogState.open}
				title={<Title />}
				onAfterClose={resetStates}
			/>
		</>
	);
};

export default EditContactWithCellphone;
