import { storage } from "~/classes/Storage";
import { Template } from "~/components";
import { useCustomRouter, useDialogState, useEmitter } from "~/hooks";
import { useGlobalStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";

const Logout = () => {
  const globalStore = useGlobalStore();
  const dialogState = useDialogState("logout");
  const { handler, loading } = useEmitter("logout");
  const router = useCustomRouter();

  const handleLogout = () => {
    handler.emitFull({}, () => {
      globalStore.closeDialog();
      storage.remove("session");
      router.push("signIn");
    });
  };

  return (
    <>
      <Template.Dialog
        actions={
          <Actions
            loading={loading}
            onClose={globalStore.closeDialog}
            onLogout={handleLogout}
          />
        }
        content={<Content />}
        open={dialogState.open}
      />
    </>
  );
};

export default Logout;
