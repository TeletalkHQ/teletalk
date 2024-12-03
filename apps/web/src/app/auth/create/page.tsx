"use client";

import {
	SubmitHandler,
	useCreateNewUser,
	useCustomRouter,
	useForm,
} from "@repo/hooks";
import { FormSchema, createNewUserForm } from "@repo/schema";
import {
	AccountCircleOutlinedIcon,
	ArrowBackIcon,
	Button,
	Container,
	Div,
	FirstName,
	Flex,
	Form,
	IconButton,
	LastName,
	Typography,
} from "@repo/ui";
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
		<Form.Base onSubmit={onSubmit}>
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
		</Form.Base>
	);
};

export default Create;
