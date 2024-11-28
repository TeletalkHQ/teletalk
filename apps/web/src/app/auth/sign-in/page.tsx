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
	Avatar,
	Button,
	Container,
	CountryCode,
	CountrySelector,
	Div,
	Flex,
	Form,
	LockOutlinedIcon,
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
		<Container mw="xl">
			<Flex ai="center" col mt={8}>
				<Avatar
					sx={(theme) => ({
						m: 1,
						backgroundColor: theme.palette.secondary.main,
					})}
				>
					<LockOutlinedIcon />
				</Avatar>

				<Typography variant="h5">Teletalk</Typography>

				<Container mw="xs">
					<Form.Base
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "10px",
						}}
						onSubmit={onSubmit}
					>
						<Div style={{ marginTop: 1 }}>
							<Typography variant="caption">
								Please verify your country code and enter your mobile phone
								number.
							</Typography>

							<CountrySelector
								countryCode={countryCode || ""}
								countryName={countryName || ""}
								onCountryNameChange={handleCountryNameChange}
								onSelectChange={handleCountrySelectChange}
							/>
							<Flex fullWidth>
								<CountryCode control={control} />
								<PhoneNumber control={control} />
							</Flex>

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
						</Div>
					</Form.Base>
				</Container>
			</Flex>

			<AuthFooter />
		</Container>
	);
};

export default SignIn;
