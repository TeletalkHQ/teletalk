import { Template } from "~/components";
import { useDialogState } from "~/hooks";
import { useGlobalStore } from "~/store";
import { DialogName } from "~/types";

import Actions from "./Actions";
import Content from "./Content";

const PrivacyAndSecurity = () => {
  const globalStore = useGlobalStore();
  const dialogState = useDialogState("privacyAndSecurity");

  const handleItemClick = (d: DialogName) => {
    globalStore.openDialog(d);
  };

  return (
    <>
      <Template.Dialog
        actions={<Actions onClose={globalStore.closeDialog} />}
        content={<Content onItemClick={handleItemClick} />}
        open={dialogState.open}
      />
    </>
  );
};

export default PrivacyAndSecurity;
