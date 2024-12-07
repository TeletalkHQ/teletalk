import { useDialogState } from "@repo/hooks/useDialogState";
import { useRemoveContact } from "@repo/hooks/useRemoveContact";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";

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
