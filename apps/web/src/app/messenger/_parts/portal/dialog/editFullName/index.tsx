import { useDialogState, useForm, useUpdateUserPublicInfo } from "@repo/hooks";
import { FormSchemaName } from "@repo/schema";
import { DialogTemplate, DoubleAction } from "@repo/ui";

import { Content } from "./content";
import { Title } from "./title";

export const EditFullName = () => {
	const dialogState = useDialogState("editFullName");

	const { emitter, isLoading } = useUpdateUserPublicInfo();

	const schemaName: FormSchemaName = "updateFullName";

	const { control, handleSubmit } = useForm<typeof schemaName>({ schemaName });

	const onSubmit = handleSubmit((data) => {
		emitter({
			data,
			options: {
				onSuccess: dialogState.close,
			},
		});
	});

	return (
		<>
			<DialogTemplate
				actions={
					<DoubleAction
						cancelProps={{
							onClick: dialogState.close,
						}}
						confirmProps={{
							onClick: onSubmit,
							loading: isLoading,
						}}
					/>
				}
				content={<Content control={control} />}
				dialogState={dialogState}
				title={<Title />}
			/>
		</>
	);
};
