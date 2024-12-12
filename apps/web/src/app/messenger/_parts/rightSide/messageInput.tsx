import { type SubmitHandler, useForm } from "@repo/hooks/useForm";
import { useSendMessage } from "@repo/hooks/useSendMessage";
import { type FormSchema, messageInputForm } from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { Form } from "@repo/ui/box/form";
import { Paper } from "@repo/ui/box/paper";
import { IconButton } from "@repo/ui/button/icon";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { FieldWithController } from "@repo/ui/input/fieldWithController";
import { CircularProgress } from "@repo/ui/loadings/circular";
import { useWatch } from "react-hook-form";
import { BsEmojiSmile } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import { CiMicrophoneOn } from "react-icons/ci";
import { TiAttachment } from "react-icons/ti";

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
							<DynamicIcon icon={TiAttachment} />
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
							<DynamicIcon icon={BsEmojiSmile} />
						</IconButton>
					</Div>

					<Div>
						{messageText ? (
							<IconButton disabled={isLoading} type="submit">
								{isLoading ? (
									<CircularProgress />
								) : (
									<DynamicIcon icon={BsSend} />
								)}
							</IconButton>
						) : (
							<>
								<IconButton
									onClick={() => {
										// TODO: Replace with `logger`
										// eslint-disable-next-line no-console
										console.debug("Mic clicked");
									}}
								>
									<DynamicIcon icon={CiMicrophoneOn} />
								</IconButton>
							</>
						)}
					</Div>
				</Flex>
			</Paper>
		</Form>
	);
};
