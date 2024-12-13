import { useDialogState } from "@repo/hooks/useDialogState";
import { useForm } from "@repo/hooks/useForm";
import { type FormSchema, updateContactForm } from "@repo/schema";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";

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