"use client";

import { updateUsernameFormDefaultValues } from "@repo/hooks/formInitialData";
import { useDialogState } from "@repo/hooks/useDialogState";
import { useForm } from "@repo/hooks/useForm";
import { useUpdateUserPublicInfo } from "@repo/hooks/useUpdateUserPublicInfo";
import { useUserInfo } from "@repo/hooks/useUserInfo";
import { type FormSchema, updateUsernameForm } from "@repo/schema";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";

import { Content } from "./content";
import { Title } from "./title";

export const EditUsername = () => {
	const dialogState = useDialogState("editUsername");

	const {
		data: { userInfo },
	} = useUserInfo();

	const { emitter, isLoading } = useUpdateUserPublicInfo();

	const { control, handleSubmit } = useForm<FormSchema["updateUsername"]>({
		schema: updateUsernameForm,
		defaultValues: updateUsernameFormDefaultValues,
		values: {
			username: userInfo.username,
		},
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
					leftButtonProps={{
						onClick: dialogState.close,
					}}
					rightButtonProps={{
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
