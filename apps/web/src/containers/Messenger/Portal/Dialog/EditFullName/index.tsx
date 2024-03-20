import { Template } from "~/components";
import { useDialogState, useUpdateProfile } from "~/hooks";
import { useGlobalStore, useSettingsStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const EditFullName = () => {
  const globalStore = useGlobalStore();
  const settingsState = useSettingsStore();
  const dialogState = useDialogState("editFullName");
  const { handler: profileUpdater, loading } = useUpdateProfile();

  const handleInputChange: OnChangeValidatorFn = (value, event) => {
    settingsState.updateProfile({
      [event.target.name]: value,
    });
  };

  const handleSaveClick = async () => {
    profileUpdater(globalStore.closeDialog);
  };

  return (
    <>
      <Template.Dialog
        actions={
          <Actions
            loading={loading}
            onCancel={globalStore.closeDialog}
            onSaveClick={handleSaveClick}
          />
        }
        content={
          <Content
            fullName={settingsState.profile}
            onChange={handleInputChange}
          />
        }
        open={dialogState.open}
        title={<Title />}
      />
    </>
  );
};

export default EditFullName;
