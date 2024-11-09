import {
	SubmitHandler,
	useAddContact,
	useDialogState,
	useForm,
} from "@repo/hooks";
import { FormSchemaName } from "@repo/schema";
import { ConfirmActions, DialogTemplate } from "@repo/ui";
import React from "react";

import { Content } from "./content";
import { Title } from "./title";

export const AddContact = () => {
	const { emitter, isLoading } = useAddContact();
	const dialogState = useDialogState("addContact");

	const schemaName: FormSchemaName = "addContact";

	const { control, formState, handleSubmit, reset } = useForm<
		typeof schemaName
	>({
		schemaName,
		defaultValues: {},
	});

	const handleAddClick: SubmitHandler<typeof schemaName> = (data) => {
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
					<ConfirmActions
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
