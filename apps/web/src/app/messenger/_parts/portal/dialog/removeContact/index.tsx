import { useDialogState, useRemoveContact } from "@repo/hooks";
import { DialogTemplate, DoubleAction } from "@repo/ui";

import { useUserStore } from "~/store";

import { Content } from "./content";

export const RemoveContact = () => {
	const dialogState = useDialogState("removeContact");

	const userIdForRemoveContact = useUserStore(
		(state) => state.userIdForRemoveContact
	);

	const { emitter, isLoading } = useRemoveContact();

	const onSubmit = () => {
		if (userIdForRemoveContact)
			emitter({
				data: {
					userId: userIdForRemoveContact,
				},
				options: {
					onSuccess: dialogState.close,
				},
			});
	};

	return (
		<>
			<DialogTemplate
				actions={
					<DoubleAction
						cancelProps={{ onClick: dialogState.close }}
						confirmProps={{
							onClick: onSubmit,
							loading: isLoading,
						}}
					/>
				}
				content={<Content />}
				dialogState={dialogState}
			/>
		</>
	);
};
