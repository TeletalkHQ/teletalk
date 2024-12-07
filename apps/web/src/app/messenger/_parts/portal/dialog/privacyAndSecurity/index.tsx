import { useDialogState } from "@repo/hooks";
import { DialogStore, useDialogStore } from "@repo/store";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { SingleAction } from "@repo/ui/template/singleAction";

import { Content } from "./content";

export const PrivacyAndSecurity = () => {
	const dialogStore = useDialogStore();
	const dialogState = useDialogState("privacyAndSecurity");

	const handleItemClick = (name: DialogStore.DialogName) => {
		dialogStore.setOpenDialog(name);
	};

	return (
		<>
			<DialogTemplate
				actions={
					<SingleAction
						closeProps={{
							onClick: dialogState.close,
						}}
					/>
				}
				content={<Content onItemClick={handleItemClick} />}
				dialogState={dialogState}
			/>
		</>
	);
};
