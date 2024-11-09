import { userUtils } from "@repo/classes";

import { useDialogState, useGetPublicData, useIsOnline } from "~/hooks";
import { useGlobalStore, useMessageStore } from "~/store";

import { Actions } from "./actions";
import { Content } from "./content";
import { Title } from "./title";

export const UserInfo = () => {
	const globalStore = useGlobalStore();
	const messageStore = useMessageStore();
	const dialogState = useDialogState("userInfo");
	const { isOnline } = useIsOnline(messageStore.selectedChatInfo.userId);
	const { publicInfo } = useGetPublicData(messageStore.selectedChatInfo.userId);

	const connectionStatus = isOnline ? "online" : "offline";

	return (
		<>
			<DialogTemplate
				actions={<Actions onClose={globalStore.closeDialog} />}
				content={
					<Content
						avatarSrc={publicInfo.avatarSrc}
						connectionStatus={connectionStatus}
						fullName={userUtils.concatFirstNameWithLastName(publicInfo)}
						fullNumber={userUtils.concatCountryCodeWithPhoneNumber(publicInfo)}
					/>
				}
				dialogState={dialogState}
				title={<Title />}
			/>
		</>
	);
};
