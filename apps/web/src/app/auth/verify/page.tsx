"use client";

import {
	SubmitHandler,
	useApiPhase,
	useCustomRouter,
	useForm,
	useVerify,
} from "@repo/hooks";
import { FormSchemaName } from "@repo/schema";
import {
	Box,
	Button,
	Field,
	Form,
	IconButton,
	Icons,
	Typography,
} from "@repo/ui";
import { useFormState } from "react-hook-form";

import { domUtils } from "~/classes";
import { useAuthUrlQueries } from "~/hooks";

import AuthFooter from "../common/AuthFooter";

const Verify = () => {
	const router = useCustomRouter();
	const {
		api: { postApi },
	} = useVerify();

	const { countryCode, phoneNumber } = useAuthUrlQueries();

	const verifyPhase = useApiPhase("verify");

	const schemaName: FormSchemaName = "verifySignInCode";
	const { control, handleSubmit, setValue } = useForm<typeof schemaName>({
		schemaName,
	});

	const { isValid } = useFormState({ control });

	const handleBackToSignInClick = () => {
		setValue("signInCode", "");
		router.back();
	};

	const submitForm: SubmitHandler<typeof schemaName> = (data) => {
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
		<Form.Base onSubmit={onSubmit}>
			<Box.Container maxWidth="xl">
				<Box.Div style={{ marginTop: 1 }}>
					<IconButton onClick={handleBackToSignInClick}>
						<Icons.ArrowBack.Element />
					</IconButton>
				</Box.Div>
				<Box.Div
					style={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Box.Avatar
						sx={(theme) => ({
							m: 1,
							backgroundColor: theme.palette.secondary.dark,
						})}
					>
						<Icons.VerifiedUser.Element />
					</Box.Avatar>
					<Box.Container maxWidth="xs">
						<Box.Div style={{ marginTop: 1 }}>
							<Typography variant="h5">
								+{countryCode} {phoneNumber}
							</Typography>

							<Typography variant="greyCaption">
								We have sent the code to the Teletalk app to your phone number.
							</Typography>

							<Field.SignInCode control={control} />

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
						</Box.Div>
					</Box.Container>
				</Box.Div>

				<AuthFooter />
			</Box.Container>
		</Form.Base>
	);
};

export default Verify;
