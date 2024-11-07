"use client";

import {
	SubmitHandler,
	useApiPhase,
	useCreateNewUser,
	useCustomRouter,
	useForm,
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

import AuthFooter from "../common/AuthFooter";

const Create = () => {
	const router = useCustomRouter();

	const {
		api: { postApi },
	} = useCreateNewUser();
	const createPhase = useApiPhase("createNewUser");

	const handleBackToSignInClick = () => {
		router.back();
	};

	const schemaName: FormSchemaName = "createNewUser";
	const { control, handleSubmit } = useForm<typeof schemaName>({
		schemaName,
	});

	const { isValid } = useFormState({ control });

	const submitForm: SubmitHandler<typeof schemaName> = (data) => {
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
			<Box.Container mw="xl">
				<Box.Div
					style={{
						marginTop: 1,
					}}
				>
					<IconButton onClick={handleBackToSignInClick}>
						<Icons.ArrowBack.Element />
					</IconButton>
				</Box.Div>
				<Box.Flex ai="center" col sx={{ marginTop: 8 }}>
					<Box.Div>
						<Icons.AccountCircleOutlined.Element
							color="primary"
							fontSize="large"
						/>
					</Box.Div>
					<Box.Container mw="xs">
						<Typography variant="greyCaption">
							Please enter this information to complete your account creation.
						</Typography>

						<Field.FirstName control={control} />
						<Field.LastName control={control} />

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
					</Box.Container>
				</Box.Flex>

				<AuthFooter />
			</Box.Container>
		</Form.Base>
	);
};

export default Create;
