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

const RemoveBlock = () => {
  const globalStore = useGlobalStore();
  const selectedUserForActions = useFindSelectedUserForActions();
  const dialogState = useDialogState("removeBlock");
  const { handler, loading } = useEmitter("removeBlock");

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

export default RemoveBlock;
