"use client";

import { extractor } from "@repo/classes";
import { updateFullNameFormDefaultValues } from "@repo/hooks/formInitialData";
import { useDialogState } from "@repo/hooks/useDialogState";
import { useForm } from "@repo/hooks/useForm";
import { useUpdateUserPublicInfo } from "@repo/hooks/useUpdateUserPublicInfo";
import { useUserInfo } from "@repo/hooks/useUserInfo";
import { type FormSchema, updateFullNameForm } from "@repo/schema";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";

import { Content } from "./content";
import { Title } from "./title";

export const EditFullName = () => {
	const dialogState = useDialogState("editFullName");

	const {
		data: { userInfo },
	} = useUserInfo();

	const { emitter, isLoading } = useUpdateUserPublicInfo();

	const { control, handleSubmit } = useForm<FormSchema["updateFullName"]>({
		schema: updateFullNameForm,
		defaultValues: updateFullNameFormDefaultValues,
		values: extractor.fullName(userInfo),
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
