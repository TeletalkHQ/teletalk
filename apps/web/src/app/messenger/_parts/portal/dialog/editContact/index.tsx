import { useDialogState, useForm } from "@repo/hooks";
import { FormSchemaName } from "@repo/schema";
import { DialogTemplate, DoubleAction } from "@repo/ui";

import { Content } from "./content";
import { Title } from "./title";

export const EditContact = () => {
	const dialogState = useDialogState("editContact");

	const schemaName: FormSchemaName = "updateContact";

	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<typeof schemaName>({ schemaName });

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
