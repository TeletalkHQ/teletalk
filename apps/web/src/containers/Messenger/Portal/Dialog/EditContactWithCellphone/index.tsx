import React, { useEffect, useState } from "react";
import type { FullName } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { maker } from "~/classes/Maker";
import { Template } from "~/components";
import {
  useDialogState,
  useEmitter,
  useFindSelectedUserForActions,
} from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";
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

  const handleInputChange: OnChangeValidatorFn = (_value: string, event) => {
    setFullName({
      ...fullName,
      [event.target.name]: event.target.value,
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
