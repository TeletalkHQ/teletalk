import { useAddContact } from "@repo/hooks/useAddContact";
import { useDialogState } from "@repo/hooks/useDialogState";
import { SubmitHandler, useForm } from "@repo/hooks/useForm";
import { FormSchema, addContactForm } from "@repo/schema";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";

import { Content } from "./content";
import { Title } from "./title";

export const AddContact = () => {
	const { emitter, isLoading } = useAddContact();
	const dialogState = useDialogState("addContact");

	const { control, formState, handleSubmit, reset } = useForm<
		FormSchema["addContact"]
	>({
		schema: addContactForm,
		defaultValues: {},
	});

	const handleAddClick: SubmitHandler<FormSchema["addContact"]> = (data) => {
		emitter({
			data,
			options: {
				onSuccess: dialogState.close,
			},
		});
	};

	const isSubmitDisabled = !formState.isValid;

	const onSubmit = handleSubmit(handleAddClick);

	return (
		<>
			<DialogTemplate
				actions={
					<DoubleAction
						cancelProps={{ onClick: dialogState.close }}
						confirmProps={{
							onClick: onSubmit,
							disabled: isSubmitDisabled,
							type: "submit",
							loading: isLoading,
						}}
					/>
				}
				content={<Content control={control} />}
				dialogState={dialogState}
				paperStyle={{
					height: "50vh",
				}}
				title={<Title />}
				onAfterClose={reset}
			/>
		</>
	);
};
