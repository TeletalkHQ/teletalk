import { useDialogState } from "@repo/hooks";
import { DialogTemplate, DoubleAction } from "@repo/ui";

import { Content } from "./content";
import { Title } from "./title";

export const Contacts = () => {
	const addContactDialog = useDialogState("addContact");

	const dialogState = useDialogState("contacts");

	return (
		<DialogTemplate
			actions={
				<DoubleAction
					cancelProps={{
						onClick: dialogState.close,
					}}
					cancelText="Close"
					confirmProps={{
						onClick: () => addContactDialog.open(),
					}}
					confirmText="Add Contact"
				/>
			}
			content={<Content />}
			dialogState={dialogState}
			paperStyle={{
				height: "90vh",
			}}
			title={<Title />}
		/>
	);
};
