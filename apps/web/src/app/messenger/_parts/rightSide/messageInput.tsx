import { SubmitHandler, useForm } from "@repo/hooks/useForm";
import { useSendMessage } from "@repo/hooks/useSendMessage";
import { FormSchema, messageInputForm } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { Form } from "@repo/ui/box/form";
import { Paper } from "@repo/ui/box/paper";
import { IconButton } from "@repo/ui/button/icon";
import { AttachFileIcon } from "@repo/ui/icons/attachFile";
import { EmojiEmotionsIcon } from "@repo/ui/icons/emojiEmotions";
import { MicNoneIcon } from "@repo/ui/icons/micNone";
import { TelegramIcon } from "@repo/ui/icons/telegram";
import { FieldWithController } from "@repo/ui/input/fieldWithController";
import { CircularProgress } from "@repo/ui/loadings/circular";
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
		<Form onSubmit={onSubmit}>
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
									<CircularProgress />
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
		</Form>
	);
};
