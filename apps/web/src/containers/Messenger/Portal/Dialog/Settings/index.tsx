import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import { useDialogState } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";
import { SettingItem } from "./types";

const Settings = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const dialogState = useDialogState("settings");

  const handleSettingItemClick = (item: SettingItem) => {
    globalStore.openDialog(item.name, {
      zIndex: 1500,
    });
  };

  return (
    <Template.Dialog
      actions={<Actions onClose={globalStore.closeDialog} />}
      content={
        <Content
          avatarSrc={userStore.currentUserData.avatarSrc}
          fullName={userUtils.concatFirstNameWithLastName(
            userStore.currentUserData
          )}
          fullNumber={userUtils.concatCountryCodeWithPhoneNumber(
            userStore.currentUserData
          )}
          username={userStore.currentUserData.username}
          onSettingItemClick={handleSettingItemClick}
        />
      }
      open={dialogState.open}
      title={<Title />}
    />
  );
};

export default Settings;
