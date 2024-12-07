import { SubmitHandler, useForm, useSendMessage } from "@repo/hooks";
import { FormSchema, messageInputForm } from "@repo/schema";
import {
	Div,
	FieldWithController,
	Flex,
	Form,
	IconButton,
	Paper,
	Progress,
} from "@repo/ui";
import { AttachFileIcon } from "@repo/ui/attachFile";
import { EmojiEmotionsIcon } from "@repo/ui/emojiEmotions";
import { MicNoneIcon } from "@repo/ui/micNone";
import { TelegramIcon } from "@repo/ui/telegram";
import { useWatch } from "react-hook-form";

export const MessageInput = () => {
	const { emitter, isLoading } = useSendMessage();

	const { control, handleSubmit, setValue } = useForm<
		FormSchema["messageInput"]
	>({
		schema: messageInputForm,
		defaultValues: {
			messageText: "",
		},
	});

	const submitForm: SubmitHandler<FormSchema["messageInput"]> = ({
		messageText,
	}) => {
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
									<TelegramIcon color="primary" />
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
