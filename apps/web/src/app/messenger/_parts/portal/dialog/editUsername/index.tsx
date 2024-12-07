import { useDialogState } from "@repo/hooks/useDialogState";
import { useForm } from "@repo/hooks/useForm";
import { useUpdateUserPublicInfo } from "@repo/hooks/useUpdateUserPublicInfo";
import { FormSchema, updateUsernameForm } from "@repo/schema";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";

import { Content } from "./content";
import { Title } from "./title";

export const EditUsername = () => {
	const dialogState = useDialogState("editUsername");

	const { emitter, isLoading } = useUpdateUserPublicInfo();

	const { control, handleSubmit } = useForm<FormSchema["updateUsername"]>({
		schema: updateUsernameForm,
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
	);
};
