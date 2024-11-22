"use client";

import {
	SubmitHandler,
	useApiPhase,
	useCustomRouter,
	useForm,
	useSignIn,
} from "@repo/hooks";
import { FormSchemaName } from "@repo/schema";
import {
	Box,
	Button,
	CountryCode,
	CountrySelector,
	Form,
	Icons,
	PhoneNumber,
	SelectedCountry,
	Typography,
} from "@repo/ui";
import { useWatch } from "react-hook-form";

import { useAuthUrlQueries } from "~/hooks";

import { AuthFooter } from "../common/AuthFooter";

const SignIn = () => {
	const {
		api: { postApi },
	} = useSignIn();

	const router = useCustomRouter();

	const authQueries = useAuthUrlQueries();

	const schemaName: FormSchemaName = "signIn";
	const { control, handleSubmit, setValue } = useForm<typeof schemaName>({
		schemaName,
		defaultValues: {
			countryCode: authQueries.countryCode,
			phoneNumber: authQueries.phoneNumber,
		},
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
	};

	const submitSignInForm: SubmitHandler<typeof schemaName> = (data) => {
		authQueries.setCountryCode(data.countryCode);
		authQueries.setPhoneNumber(data.phoneNumber);

		postApi.handler({
			data,
			config: {
				onSuccess: () => {
					router.push("/auth/verify", {
						countryCode: data.countryCode,
						phoneNumber: data.phoneNumber,
					});
				},
			},
		});
	};

	const onSubmit = handleSubmit(submitSignInForm);

	return (
		<Box.Container mw="xl">
			<Box.Flex ai="center" col mt={8}>
				<Box.Avatar
					sx={(theme) => ({
						m: 1,
						backgroundColor: theme.palette.secondary.main,
					})}
				>
					<Icons.LockOutlined.Element />
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
								<CountryCode control={control} />
								<PhoneNumber control={control} />
							</Box.Flex>

							<Button
								// disabled={!isValid}
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
