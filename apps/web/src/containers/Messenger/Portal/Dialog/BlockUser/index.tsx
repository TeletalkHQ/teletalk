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

const BlockUser = () => {
  const globalStore = useGlobalStore();
  const dialogState = useDialogState("blockUser");
  const selectedUserForActions = useFindSelectedUserForActions();

  const { handler: addBlockHandler, loading: addBlockLoading } =
    useEmitter("addBlock");

  const { handler: removeBlockHandler, loading: removeBlockLoading } =
    useEmitter("removeBlock");

  const handleConfirm = () => {
    (selectedUserForActions.isBlocked
      ? removeBlockHandler
      : addBlockHandler
    ).emitFull(
      {
        userId: selectedUserForActions.userId,
      },
      globalStore.closeDialog
    );
  };

  const loading = addBlockLoading || removeBlockLoading;

  return (
    <>
      <Template.Dialog
        actions={
          <Actions
            loading={loading}
            onCancel={globalStore.closeDialog}
            onConfirm={handleConfirm}
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

export default BlockUser;
