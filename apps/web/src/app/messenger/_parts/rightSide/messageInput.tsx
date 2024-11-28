import { SubmitHandler, useForm, useSendMessage } from "@repo/hooks";
import { FormSchemaName } from "@repo/schema";
import {
	AttachFileIcon,
	Box,
	EmojiEmotionsIcon,
	FieldWithController,
	Form,
	IconButton,
	MicNoneIcon,
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
			<Box.Paper style={{ borderRadius: 0 }}>
				<Box.Flex ai="center" gap={1} jc="space-between" style={{ padding: 5 }}>
					<Box.Div>
						<IconButton onClick={() => {}}>
							<AttachFileIcon />
						</IconButton>
					</Box.Div>

					<Box.Div style={{ width: "100%" }}>
						<FieldWithController
							autoFocus
							control={control}
							maxRows={8}
							multiline
							name="messageText"
							placeholder="Type a message..."
						/>
					</Box.Div>

					<Box.Div>
						<IconButton>
							<EmojiEmotionsIcon />
						</IconButton>
					</Box.Div>

					<Box.Div>
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
					</Box.Div>
				</Box.Flex>
			</Box.Paper>
		</Form.Base>
	);
};
