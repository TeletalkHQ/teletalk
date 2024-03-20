import { Template } from "~/components";
import { useDialogState, useUpdateProfile } from "~/hooks";
import { useGlobalStore, useSettingsStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const EditBio = () => {
  const globalStore = useGlobalStore();
  const settingsStore = useSettingsStore();
  const { handler: profileUpdater, loading } = useUpdateProfile();
  const dialogState = useDialogState("editBio");

  const handleInputChange: OnChangeValidatorFn = (value, event) => {
    settingsStore.updateProfile({ [event.target.name]: value });
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
            bio={settingsStore.profile.bio}
            onChange={handleInputChange}
          />
        }
        open={dialogState.open}
        title={<Title />}
      />
    </>
  );
};

export default EditBio;
