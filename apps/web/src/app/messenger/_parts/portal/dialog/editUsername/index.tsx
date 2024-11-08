import { stuffStore } from "~/classes/StuffStore";
import { useDialogState, useUpdateProfile } from "~/hooks";
import { useGlobalStore, useSettingsStore } from "~/store";
import { OnInputChange } from "~/types";

import { Actions } from "./actions";
import { Content } from "./content";
import { Title } from "./title";

export const EditUsername = () => {
	const globalStore = useGlobalStore();
	const settingsState = useSettingsStore();
	const dialogState = useDialogState("editUsername");
	const { handler: profileUpdater, loading } = useUpdateProfile();

	const handleInputChange: OnInputChange = (e) => {
		settingsState.updateProfile({
			[e.target.name]: e.target.value,
		});
	};

	const handleSaveClick = async () => {
		profileUpdater(globalStore.closeDialog);
	};

	return (
		<>
			<DialogTemplate
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
