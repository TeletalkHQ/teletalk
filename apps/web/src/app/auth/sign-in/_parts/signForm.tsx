"use client";

import { useCustomRouter } from "@repo/hooks/useCustomRouter";
import { useForm } from "@repo/hooks/useForm";
import { useSignIn } from "@repo/hooks/useSignIn";
import { signInForm } from "@repo/schema";
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

import { FormContainer } from "../../_parts/FormContainer";

export const SignForm: React.FC<PropsWithChildren> = () => {
	const {
		api: { postApi },
	} = useSignIn();

	const router = useCustomRouter();

	const authQueries = useAuthUrlQueries();

	const { control, handleSubmit, setValue } = useForm({
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

	const onSubmit = handleSubmit((data) => {
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
	});

	return (
		<Form onSubmit={onSubmit}>
			<FormContainer>
				<Typography variant="caption">
					Please verify your country code and enter your mobile phone number.
				</Typography>

				<CountrySelector
					countryCode={countryCode || ""}
					countryName={countryName || ""}
					onCountryNameChange={handleCountryNameChange}
					onSelectChange={handleCountrySelectChange}
				/>
				<Flex fullWidth gap="8px">
					<CountryCode control={control} />
					<PhoneNumber control={control} />
				</Flex>

				<Button
					fullWidth
					loading={signInPhase.isLoading}
					loadingIndicatorText="Sign in..."
					type="submit"
				>
					Next
				</Button>
			</FormContainer>
		</Form>
	);
};
