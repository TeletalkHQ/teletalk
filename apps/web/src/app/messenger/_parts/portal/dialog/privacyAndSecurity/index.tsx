import { useDialogState } from "~/hooks";
import { GlobalStore, useGlobalStore } from "~/store";

import { Actions } from "./actions";
import { Content } from "./content";

export const PrivacyAndSecurity = () => {
	const globalStore = useGlobalStore();
	const dialogState = useDialogState("privacyAndSecurity");

	const handleItemClick = (d: GlobalStore.DialogName) => {
		globalStore.openDialog(d);
	};

	return (
		<>
			<DialogTemplate
				actions={<Actions onClose={globalStore.closeDialog} />}
				content={<Content onItemClick={handleItemClick} />}
				open={dialogState.open}
			/>
		</>
	);
};
