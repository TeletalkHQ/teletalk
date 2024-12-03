import { useDialogState, useForm, useUpdateUserPublicInfo } from "@repo/hooks";
import { FormSchema, updateBioForm } from "@repo/schema";
import { DialogTemplate, DoubleAction } from "@repo/ui";

import { Content } from "./content";
import { Title } from "./title";

export const EditBio = () => {
	const dialogState = useDialogState("editBio");

	const { emitter } = useUpdateUserPublicInfo();

	const { control, handleSubmit } = useForm<FormSchema["updateBio"]>({
		schema: updateBioForm,
	});

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
