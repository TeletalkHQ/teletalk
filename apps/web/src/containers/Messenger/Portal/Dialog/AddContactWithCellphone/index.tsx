import React from "react";

import { maker } from "~/classes/Maker";
import { Template } from "~/components";
import { useDialogState, useEmitter } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const AddContactWithCellphone = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const { handler, loading } = useEmitter("addContactWithCellphone");
  const dialogState = useDialogState("addContactWithCellphone");

  const handleChange: OnChangeValidatorFn = (_value: string, event) => {
    userStore.updateAddingContactWithCellphone({
      [event.target.name]: event.target.value,
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
      maker.emptyAddingContactWithCellphone()
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
