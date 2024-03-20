import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import {
  useDialogState,
  useEmitter,
  useFindSelectedUserForActions,
} from "~/hooks";
import { useGlobalStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";

const RemoveContact = () => {
  const globalStore = useGlobalStore();
  const dialogState = useDialogState("removeContact");
  const selectedUserForActions = useFindSelectedUserForActions();
  const { handler, loading } = useEmitter("removeContact");

  const handleRemoveContact = () => {
    handler.emitFull(
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
      <Template.Dialog
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

export default RemoveContact;
