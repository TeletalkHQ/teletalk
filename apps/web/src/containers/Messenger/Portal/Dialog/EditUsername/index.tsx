import { stuffStore } from "~/classes/StuffStore";
import { Template } from "~/components";
import { useDialogState, useUpdateProfile } from "~/hooks";
import { useGlobalStore, useSettingsStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const EditUsername = () => {
  const globalStore = useGlobalStore();
  const settingsState = useSettingsStore();
  const dialogState = useDialogState("editUsername");
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
            username={settingsState.profile.username}
            usernameLength={stuffStore.models.username.minLength}
            onChange={handleInputChange}
          />
        }
        open={dialogState.open}
        title={<Title />}
      />
    </>
  );
};

export default EditUsername;
