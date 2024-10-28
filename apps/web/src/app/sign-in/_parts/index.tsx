import { SubmitHandler, useApiPhase, useForm, useSignIn } from "@repo/hooks";
import { FormSchemaName } from "@repo/schema";
import {
	Box,
	Button,
	CountrySelector,
	Field,
	Form,
	SelectedCountry,
	Typography,
} from "@repo/ui";
import { useFormState, useWatch } from "react-hook-form";

import AuthFooter from "./AuthFooter";

const SignIn = () => {
	const {
		handlers: { signIn },
	} = useSignIn();

	const schemaName: FormSchemaName = "signIn";
	const { control, handleSubmit, setValue } = useForm<typeof schemaName>({
		schemaName,
	});

	const { countryCode, countryName } = useWatch({
		control,
	});

	const signInPhase = useApiPhase("signIn");

	const handleCountryNameChange = (value: string) => {
		setValue("countryName", value);
	};

	const handleCountrySelectChange = (value: SelectedCountry) => {
		setValue("countryName", value?.countryName || "");
		setValue("countryCode", value?.countryCode || "");
		// userStore.setNewCountryCode(value?.country_code || "");
	};

	const submitSignInForm: SubmitHandler<typeof schemaName> = (data) => {
		signIn({
			data,
		});
	};

	const onSubmit = handleSubmit(submitSignInForm);

	const { isValid } = useFormState({ control });

	return (
		<Box.Container mw="xl">
			<Box.Flex ai="center" col mt={8}>
				<Box.Avatar
					sx={(theme) => ({
						m: 1,
						backgroundColor: theme.palette.secondary.main,
					})}
				>
					{/* <Icon.LockOutlined.Element /> */}
				</Box.Avatar>

				<Typography variant="h5">Teletalk</Typography>

				<Box.Container mw="xs">
					<Form.Base
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "10px",
						}}
						onSubmit={onSubmit}
					>
						<Box.Div style={{ marginTop: 1 }}>
							<Typography variant="greyCaption">
								Please verify your country code and enter your mobile phone
								number.
							</Typography>

							<CountrySelector
								countryCode={countryCode || ""}
								countryName={countryName || ""}
								onCountryNameChange={handleCountryNameChange}
								onSelectChange={handleCountrySelectChange}
							/>
							<Box.Flex fullWidth>
								<Field.CountryCode control={control} />
								<Field.PhoneNumber control={control} />
							</Box.Flex>

							<Button
								disabled={!isValid}
								loading={signInPhase.isLoading}
								loadingIndicatorText="Sign in..."
								sx={{
									mb: 1,
									mt: 2,
								}}
								type="submit"
							>
								Next
							</Button>
						</Box.Div>
					</Form.Base>
				</Box.Container>
			</Box.Flex>

			<AuthFooter />
		</Box.Container>
	);
};

export default SignIn;
