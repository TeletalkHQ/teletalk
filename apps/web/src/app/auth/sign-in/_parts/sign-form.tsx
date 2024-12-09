"use client";

import { useCustomRouter } from "@repo/hooks/useCustomRouter";
import { type SubmitHandler, useForm } from "@repo/hooks/useForm";
import { useSignIn } from "@repo/hooks/useSignIn";
import { type FormSchema, signInForm } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { Form } from "@repo/ui/box/form";
import { Button } from "@repo/ui/button/button";
import { CountryCode } from "@repo/ui/input/countryCode";
import {
	CountrySelector,
	type SelectedCountry,
} from "@repo/ui/input/countrySelector";
import { PhoneNumber } from "@repo/ui/input/phoneNumber";
import { Typography } from "@repo/ui/typography/typography";
import { useApiPhase } from "@repo/use-api";
import { type PropsWithChildren } from "react";
import { useWatch } from "react-hook-form";

import { useAuthUrlQueries } from "~/hooks/utils/useAuthUrlQueries";

export const SignForm: React.FC<PropsWithChildren> = () => {
	const {
		api: { postApi },
	} = useSignIn();

	const router = useCustomRouter();

	const authQueries = useAuthUrlQueries();

	const {
		control,
		handleSubmit,
		setValue,
		formState: { isValid },
	} = useForm<FormSchema["signIn"]>({
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
		<Form
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
			</Div>
		</Form>
	);
};
