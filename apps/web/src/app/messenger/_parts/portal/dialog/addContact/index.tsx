import {
	SubmitHandler,
	useAddContact,
	useDialogState,
	useForm,
} from "@repo/hooks";
import { FormSchema, addContactForm } from "@repo/schema";
import { DialogTemplate, DoubleAction } from "@repo/ui";

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
