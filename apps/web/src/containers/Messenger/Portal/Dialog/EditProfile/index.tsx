import { useEffect } from "react";
import { extractor } from "utility-store";

import { Template } from "~/components";
import { useDialogState } from "~/hooks";
import { useGlobalStore, useSettingsStore, useUserStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";
import { EditProfileListItem } from "./types";

const EditProfile = () => {
  const globalStore = useGlobalStore();
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();
  const dialogState = useDialogState("editProfile");

  const handleAvatarClick = () => {
    if (userStore.currentUserData.avatarSrc)
      globalStore.openDialog("avatarViewer");
    else globalStore.openDialog("avatarSelector");
  };

  useEffect(() => {
    if (dialogState.open)
      settingsStore.updateProfile({
        ...extractor.cellphone(userStore.currentUserData),
        ...extractor.fullName(userStore.currentUserData),
        bio: userStore.currentUserData.bio,
        username: userStore.currentUserData.username,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogState.open, userStore]);

  const handleItemClick = (item: EditProfileListItem) => {
    globalStore.openDialog(item.name, {
      zIndex: 1500,
    });
  };

  return (
    <>
      <Template.Dialog
        actions={<Actions onCancel={globalStore.closeDialog} />}
        content={
          <Content
            avatarSrc={userStore.currentUserData.avatarSrc}
            profile={settingsStore.profile}
            onAvatarClick={handleAvatarClick}
            onClick={handleItemClick}
          />
        }
        open={dialogState.open}
        title={<Title />}
      />
    </>
  );
};

export default EditProfile;
