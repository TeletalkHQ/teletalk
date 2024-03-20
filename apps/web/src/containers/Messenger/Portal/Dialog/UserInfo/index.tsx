import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import { useDialogState, useGetPublicData, useIsOnline } from "~/hooks";
import { useGlobalStore, useMessageStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const UserInfo = () => {
  const globalStore = useGlobalStore();
  const messageStore = useMessageStore();
  const dialogState = useDialogState("userInfo");
  const { isOnline } = useIsOnline(messageStore.selectedChatInfo.userId);
  const { publicData } = useGetPublicData(messageStore.selectedChatInfo.userId);

  const connectionStatus = isOnline ? "online" : "offline";

  return (
    <>
      <Template.Dialog
        actions={<Actions onClose={globalStore.closeDialog} />}
        content={
          <Content
            avatarSrc={publicData.avatarSrc}
            connectionStatus={connectionStatus}
            fullName={userUtils.concatFirstNameWithLastName(publicData)}
            fullNumber={userUtils.concatCountryCodeWithPhoneNumber(publicData)}
          />
        }
        open={dialogState.open}
        title={<Title />}
      />
    </>
  );
};

export default UserInfo;
