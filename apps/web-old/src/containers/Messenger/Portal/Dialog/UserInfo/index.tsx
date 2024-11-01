import { userUtils } from "@repo/classes";

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
	const { publicInfo } = useGetPublicData(messageStore.selectedChatInfo.userId);

	const connectionStatus = isOnline ? "online" : "offline";

	return (
		<>
			<Template.Dialog
				actions={<Actions onClose={globalStore.closeDialog} />}
				content={
					<Content
						avatarSrc={publicInfo.avatarSrc}
						connectionStatus={connectionStatus}
						fullName={userUtils.concatFirstNameWithLastName(publicInfo)}
						fullNumber={userUtils.concatCountryCodeWithPhoneNumber(publicInfo)}
					/>
				}
				open={dialogState.open}
				title={<Title />}
			/>
		</>
	);
};

export default UserInfo;