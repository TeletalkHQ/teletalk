import { userUtils } from "@repo/classes";
import { Template } from "@repo/ui";

import { useDialogState } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";

import { Actions } from "./actions";
import { Content } from "./content";
import { Title } from "./title";
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
		<DialogTemplate
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
