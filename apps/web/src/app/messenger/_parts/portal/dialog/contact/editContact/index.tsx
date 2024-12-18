import { updateContactFormDefaultValues } from "@repo/hooks/formInitialData";
import { useDialogState } from "@repo/hooks/useDialogState";
import { useForm } from "@repo/hooks/useForm";
import { useUpdateContact } from "@repo/hooks/useUpdateContact";
import { useUserInfo } from "@repo/hooks/useUserInfo";
import { type FormSchema, updateContactForm } from "@repo/schema";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";

import { useUserStore } from "~/store";

import { Content } from "./content";
import { Title } from "./title";

export const EditContact = () => {
	const dialogState = useDialogState("editContact");

	const { emitter } = useUpdateContact();

	const selectedUUID = useUserStore((state) => state.selectedUUID);

	const {
		data: { userInfo },
	} = useUserInfo();

	const selectedContactToEdit = userInfo.contacts.find(
		(item) => item.userId === selectedUUID.to.editContact
	);

	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<FormSchema["updateContact"]>({
		schema: updateContactForm,
		defaultValues: updateContactFormDefaultValues,
		values: {
			firstName: selectedContactToEdit?.firstName || "",
			lastName: selectedContactToEdit?.lastName || "",
		},
	});

	const onSubmit = handleSubmit((data) => {
		// TODO: Toast error
		if (!selectedContactToEdit) return;

		emitter({
			data: {
				...data,
				userId: selectedContactToEdit.userId,
			},
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
