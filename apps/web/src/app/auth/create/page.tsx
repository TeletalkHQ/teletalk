"use client";

import { useCreateNewUser } from "@repo/hooks/useCreateNewUser";
import { useCustomRouter } from "@repo/hooks/useCustomRouter";
import { SubmitHandler, useForm } from "@repo/hooks/useForm";
import { FormSchema, createNewUserForm } from "@repo/schema";
import { Container } from "@repo/ui/box/container";
import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { Form } from "@repo/ui/box/form";
import { Button } from "@repo/ui/button/button";
import { IconButton } from "@repo/ui/button/icon";
import { AccountCircleOutlinedIcon } from "@repo/ui/icons/accountCircleOutlined";
import { ArrowBackIcon } from "@repo/ui/icons/arrowBack";
import { FirstName } from "@repo/ui/input/firstName";
import { LastName } from "@repo/ui/input/lastName";
import { Typography } from "@repo/ui/typography/typography";
import { useApiPhase } from "@repo/use-api";
import { useFormState } from "react-hook-form";

import { AuthFooter } from "../common/AuthFooter";

const Create = () => {
	const router = useCustomRouter();

	const {
		api: { postApi },
	} = useCreateNewUser();
	const createPhase = useApiPhase("createNewUser");

	const handleBackToSignInClick = () => {
		router.back();
	};

	const { control, handleSubmit } = useForm<FormSchema["createNewUser"]>({
		schema: createNewUserForm,
	});

	const { isValid } = useFormState({ control });

	const submitForm: SubmitHandler<FormSchema["createNewUser"]> = (data) => {
		postApi.handler({
			data,
			config: {
				onSuccess: () => {
					router.push("/messenger");
				},
			},
		});
	};
	const onSubmit = handleSubmit(submitForm);

	return (
		<Form onSubmit={onSubmit}>
			<Container mw="xl">
				<Div
					style={{
						marginTop: 1,
					}}
				>
					<IconButton onClick={handleBackToSignInClick}>
						<ArrowBackIcon />
					</IconButton>
				</Div>
				<Flex ai="center" col sx={{ marginTop: 8 }}>
					<Div>
						<AccountCircleOutlinedIcon color="primary" fontSize="large" />
					</Div>
					<Container mw="xs">
						<Typography variant="caption">
							Please enter this information to complete your account creation.
						</Typography>

						<FirstName control={control} />
						<LastName control={control} />

						<Button
							disabled={!isValid}
							loading={createPhase.isLoading}
							loadingIndicatorText="Creating..."
							sx={{
								mt: 1,
							}}
							type="submit"
						>
							Create
						</Button>
					</Container>
				</Flex>

				<AuthFooter />
			</Container>
		</Form>
	);
};

export default Create;
