import { Template } from "~/components";
import { useDialogState } from "~/hooks";
import { GlobalStore, useGlobalStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";

const PrivacyAndSecurity = () => {
	const globalStore = useGlobalStore();
	const dialogState = useDialogState("privacyAndSecurity");

	const handleItemClick = (d: GlobalStore.DialogName) => {
		globalStore.openDialog(d);
	};

	return (
		<>
			<Template.Dialog
				actions={<Actions onClose={globalStore.closeDialog} />}
				content={<Content onItemClick={handleItemClick} />}
				open={dialogState.open}
			/>
		</>
	);
};

export default PrivacyAndSecurity;
