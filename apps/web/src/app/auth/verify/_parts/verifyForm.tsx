"use client";

import { verifySignInCodeFormDefaultValues } from "@repo/hooks/formInitialData";
import { useCustomRouter } from "@repo/hooks/useCustomRouter";
import { useForm } from "@repo/hooks/useForm";
import { useVerify } from "@repo/hooks/useVerify";
import { type FormSchema, verifySignInCodeForm } from "@repo/schema";
import { Form } from "@repo/ui/box/form";
import { Button } from "@repo/ui/button/button";
import { SignInCode } from "@repo/ui/input/signInCode";
import { useApiPhase } from "@repo/use-api";

import { domUtils } from "~/classes";

import { FormContainer } from "../../_parts/FormContainer";

export const VerifyForm = () => {
	const {
		api: { postApi },
	} = useVerify();

	const verifyPhase = useApiPhase("verify");
	const { control, handleSubmit, setValue } = useForm<
		FormSchema["verifySignInCode"]
	>({
		schema: verifySignInCodeForm,
		defaultValues: verifySignInCodeFormDefaultValues,
	});

	const router = useCustomRouter();

	const backToSignIn = () => {
		setValue("signInCode", "");
		router.back();
	};

	const onSubmit = handleSubmit((data) => {
		postApi.handler({
			data,
			config: {
				onError: () => {
					domUtils()
						.setElementById("signInCode")
						.focusElement()
						.selectAllValue();
				},
				onSuccess: ({ data }) => {
					if (data.data.isNewUser) router.replace("create");
					else {
						router.push("/messenger");
					}
				},
			},
		});
	});

	return (
		<Form onSubmit={onSubmit}>
			<FormContainer>
				<SignInCode control={control} />
				<Button
					fullWidth
					loading={verifyPhase.isLoading}
					loadingIndicatorText="Verifying..."
					type="submit"
				>
					Verify
				</Button>

				<Button variant="text" onClick={backToSignIn}>
					Edit Phone Number
				</Button>
			</FormContainer>
		</Form>
	);
};
