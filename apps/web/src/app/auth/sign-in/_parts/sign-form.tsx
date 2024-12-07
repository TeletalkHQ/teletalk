"use client";

import {
	SubmitHandler,
	useCustomRouter,
	useForm,
	useSignIn,
} from "@repo/hooks";
import { FormSchema, signInForm } from "@repo/schema";
import {
	Button,
	CountryCode,
	CountrySelector,
	Div,
	Flex,
	Form,
	PhoneNumber,
	SelectedCountry,
	Typography,
} from "@repo/ui";
import { useApiPhase } from "@repo/use-api";
import { PropsWithChildren } from "react";
import { useWatch } from "react-hook-form";

import { useAuthUrlQueries } from "~/hooks";

export const SignForm: React.FC<PropsWithChildren> = () => {
	const {
		api: { postApi },
	} = useSignIn();

	const router = useCustomRouter();

	const authQueries = useAuthUrlQueries();

	const { control, handleSubmit, setValue } = useForm<FormSchema["signIn"]>({
		schema: signInForm,
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

	const submitSignInForm: SubmitHandler<FormSchema["signIn"]> = (data) => {
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
					Please verify your country code and enter your mobile phone number.
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
	);
};
