"use client";

import { useCustomRouter } from "@repo/hooks/useCustomRouter";
import { type SubmitHandler, useForm } from "@repo/hooks/useForm";
import { useVerify } from "@repo/hooks/useVerify";
import { type FormSchema, verifySignInCodeForm } from "@repo/schema";
import { Avatar } from "@repo/ui/box/Avatar";
import { Container } from "@repo/ui/box/container";
import { Div } from "@repo/ui/box/div";
import { Form } from "@repo/ui/box/form";
import { Button } from "@repo/ui/button/button";
import { IconButton } from "@repo/ui/button/icon";
import { ArrowBackIcon } from "@repo/ui/icons/arrowBack";
import { VerifiedUserIcon } from "@repo/ui/icons/verifiedUser";
import { SignInCode } from "@repo/ui/input/signInCode";
import { Typography } from "@repo/ui/typography/typography";
import { useApiPhase } from "@repo/use-api";
import { useFormState } from "react-hook-form";

import { domUtils } from "~/classes";
import { useAuthUrlQueries } from "~/hooks/utils/useAuthUrlQueries";

import { AuthFooter } from "../common/AuthFooter";

const Verify = () => {
	const router = useCustomRouter();
	const {
		api: { postApi },
	} = useVerify();

	const { countryCode, phoneNumber } = useAuthUrlQueries();

	const verifyPhase = useApiPhase("verify");

	const { control, handleSubmit, setValue } = useForm<
		FormSchema["verifySignInCode"]
	>({
		schema: verifySignInCodeForm,
	});

	const { isValid } = useFormState({
		control,
	});

	const handleBackToSignInClick = () => {
		setValue("signInCode", "");
		router.back();
	};

	const submitForm: SubmitHandler<FormSchema["verifySignInCode"]> = (data) => {
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
	};

	const onSubmit = handleSubmit(submitForm);

	return (
		<Form onSubmit={onSubmit}>
			<Container maxWidth="xl">
				<Div style={{ marginTop: 1 }}>
					<IconButton onClick={handleBackToSignInClick}>
						<ArrowBackIcon />
					</IconButton>
				</Div>
				<Div
					style={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar
						sx={(theme) => ({
							m: 1,
							backgroundColor: theme.palette.secondary.dark,
						})}
					>
						<VerifiedUserIcon />
					</Avatar>
					<Container maxWidth="xs">
						<Div style={{ marginTop: 1 }}>
							<Typography variant="h5">
								+{countryCode} {phoneNumber}
							</Typography>

							<Typography variant="caption">
								We have sent the code to the Teletalk app to your phone number.
							</Typography>

							<SignInCode control={control} />

							<Button
								disabled={!isValid}
								loading={verifyPhase.isLoading}
								loadingIndicatorText="Verifying..."
								sx={{
									mb: 2,
									mt: 2,
								}}
								type="submit"
							>
								Verify
							</Button>
						</Div>
					</Container>
				</Div>

				<AuthFooter />
			</Container>
		</Form>
	);
};

export default Verify;
