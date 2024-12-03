import { useDialogState, useForm } from "@repo/hooks";
import { FormSchema, updateContactForm } from "@repo/schema";
import { DialogTemplate, DoubleAction } from "@repo/ui";

import { Content } from "./content";
import { Title } from "./title";

export const EditContact = () => {
	const dialogState = useDialogState("editContact");

	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<FormSchema["updateContact"]>({
		schema: updateContactForm,
	});

	const onSubmit = handleSubmit((_data) => {
		// emitter({
		// 	data,
		// 	options: {
		// 		onSuccess: dialogState.close,
		// 	},
		// });
	});

	return (
		<DialogTemplate
			actions={
				<DoubleAction
					cancelProps={{
						onClick: dialogState.close,
					}}
					confirmProps={{
						loading: false,
						onClick: onSubmit,
						type: "submit",
						disabled: !isValid,
					}}
				/>
			}
			content={<Content control={control} />}
			dialogState={dialogState}
			title={<Title />}
		/>
	);
};
