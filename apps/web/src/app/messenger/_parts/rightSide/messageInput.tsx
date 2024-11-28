import { SubmitHandler, useForm, useSendMessage } from "@repo/hooks";
import { FormSchemaName } from "@repo/schema";
import {
	AttachFileIcon,
	Div,
	EmojiEmotionsIcon,
	FieldWithController,
	Flex,
	Form,
	IconButton,
	MicNoneIcon,
	Paper,
	Progress,
	SendIcon,
} from "@repo/ui";
import { useWatch } from "react-hook-form";

export const MessageInput = () => {
	const { emitter, isLoading } = useSendMessage();

	const schemaName: FormSchemaName = "messageInput";

	const { control, handleSubmit, setValue } = useForm<typeof schemaName>({
		schemaName,
		defaultValues: {
			messageText: "",
		},
	});

	const submitForm: SubmitHandler<typeof schemaName> = ({ messageText }) => {
		console.log("messageText:", messageText);

		emitter({
			data: {
				messageText,
				targetParticipantId: "messageStore.selectedChatInfo.userId",
			},
			options: {
				onSuccess: () => {
					setValue("messageText", "");
				},
			},
		});
	};

	const { messageText } = useWatch({ control });

	const onSubmit = handleSubmit(submitForm);

	return (
		<Form.Base onSubmit={onSubmit}>
			<Paper style={{ borderRadius: 0 }}>
				<Flex ai="center" gap={1} jc="space-between" style={{ padding: 5 }}>
					<Div>
						<IconButton onClick={() => {}}>
							<AttachFileIcon />
						</IconButton>
					</Div>

					<Div style={{ width: "100%" }}>
						<FieldWithController
							autoFocus
							control={control}
							maxRows={8}
							multiline
							name="messageText"
							placeholder="Type a message..."
						/>
					</Div>

					<Div>
						<IconButton>
							<EmojiEmotionsIcon />
						</IconButton>
					</Div>

					<Div>
						{messageText ? (
							<IconButton disabled={isLoading} type="submit">
								{isLoading ? (
									<Progress.Circular />
								) : (
									<SendIcon color="primary" />
								)}
							</IconButton>
						) : (
							<>
								<IconButton
									onClick={() => {
										console.debug("Mic clicked");
									}}
								>
									<MicNoneIcon />
								</IconButton>
							</>
						)}
					</Div>
				</Flex>
			</Paper>
		</Form.Base>
	);
};
