"use client";

import { addContactFormDefaultValues } from "@repo/hooks/formInitialData";
import { useAddContactByPhone } from "@repo/hooks/useAddContact";
import { useDialogState } from "@repo/hooks/useDialogState";
import { type SubmitHandler, useForm } from "@repo/hooks/useForm";
import { type FormSchema, addContactForm } from "@repo/schema";
import type {
	OnCountryNameChange,
	OnCountrySelectChange,
} from "@repo/ui/input/countrySelector";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";

import { Content } from "./content";
import { Title } from "./title";

export const AddContactByPhone = () => {
	const { emitter, isLoading } = useAddContactByPhone();

	const dialogState = useDialogState("addContactByPhone");

	const { control, formState, handleSubmit, reset, setValue } = useForm<
		FormSchema["addContactByPhone"]
	>({
		schema: addContactForm,
		defaultValues: addContactFormDefaultValues,
	});

	const handleAddClick: SubmitHandler<FormSchema["addContactByPhone"]> = (
		data
	) => {
		emitter({
			data,
			options: {
				onSuccess: dialogState.close,
			},
		});
	};

	const handleCountryNameChange: OnCountryNameChange = (value) => {
		setValue("countryName", value);
	};

	const handleCountrySelectChange: OnCountrySelectChange = (value) => {
		setValue("countryCode", value?.countryCode || "");
		setValue("countryName", value?.countryName || "");
	};

	const onSubmit = handleSubmit(handleAddClick);

	return (
		<DialogTemplate
			actions={
				<DoubleAction
					leftButtonProps={{
						onClick: dialogState.close,
					}}
					rightButtonProps={{
						loading: isLoading,
						onClick: onSubmit,
						type: "submit",
					}}
				/>
			}
			content={
				<Content
					control={control}
					onCountryNameChange={handleCountryNameChange}
					onCountrySelectChange={handleCountrySelectChange}
				/>
			}
			dialogState={{ ...dialogState, isOpen: true }}
			paperProps={{ className: "w-full max-w-sm" }}
			title={<Title />}
			onAfterClose={reset}
		/>
	);
};
