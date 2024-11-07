import { Template } from "@repo/ui";

import { useDialogState, useUpdateProfile } from "~/hooks";
import { useGlobalStore, useSettingsStore } from "~/store";
import { OnInputChange } from "~/types";

import { Actions } from "./actions";
import { Content } from "./content";
import { Title } from "./title";

const EditFullName = () => {
	const globalStore = useGlobalStore();
	const settingsState = useSettingsStore();
	const dialogState = useDialogState("editFullName");
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
