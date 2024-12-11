"use client";

import { useCreateUser } from "@repo/hooks/useCreateUser";
import { useCustomRouter } from "@repo/hooks/useCustomRouter";
import { useForm } from "@repo/hooks/useForm";
import { type FormSchema, createUserForm } from "@repo/schema";
import { Form } from "@repo/ui/box/form";
import { Button } from "@repo/ui/button/button";
import { FirstName } from "@repo/ui/input/firstName";
import { LastName } from "@repo/ui/input/lastName";
import { useApiPhase } from "@repo/use-api";

import { FormContainer } from "../../_parts/FormContainer";

export const CreateUserForm = () => {
	const router = useCustomRouter();
	const {
		api: { postApi },
	} = useCreateUser();
	const createPhase = useApiPhase("createUser");

	const { control, handleSubmit } = useForm<FormSchema["createUser"]>({
		schema: createUserForm,
	});

	const onSubmit = handleSubmit((data) => {
		postApi.handler({
			data,
			config: {
				onSuccess: () => {
					router.push("/messenger");
				},
			},
		});
	});

	const backToSignIn = () => {
		router.back();
	};

	return (
		<Form onSubmit={onSubmit}>
			<FormContainer>
				<FirstName control={control} />
				<LastName control={control} />

				<Button
					fullWidth
					loading={createPhase.isLoading}
					loadingIndicatorText="Creating..."
					type="submit"
				>
					Create
				</Button>

				<Button variant="text" onClick={backToSignIn}>
					Back To Sign In
				</Button>
			</FormContainer>
		</Form>
	);
};
