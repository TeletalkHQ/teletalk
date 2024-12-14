import { updateBioFormDefaultValues } from "@repo/hooks/formInitialData";
import { useDialogState } from "@repo/hooks/useDialogState";
import { useForm } from "@repo/hooks/useForm";
import { useUpdateUserPublicInfo } from "@repo/hooks/useUpdateUserPublicInfo";
import { useUserInfo } from "@repo/hooks/useUserInfo";
import { type FormSchema, updateBioForm } from "@repo/schema";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";

import { Content } from "./content";
import { Title } from "./title";

export const EditBio = () => {
	const dialogState = useDialogState("editBio");

	const {
		data: { userInfo },
	} = useUserInfo();

	const { emitter } = useUpdateUserPublicInfo();

	const { control, handleSubmit } = useForm<FormSchema["updateBio"]>({
		schema: updateBioForm,
		defaultValues: updateBioFormDefaultValues,
		values: { bio: userInfo.bio },
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
						leftButtonProps={{
							onClick: dialogState.close,
						}}
						rightButtonProps={{
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
