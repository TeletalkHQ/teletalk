import { SocketOnHandler } from "@repo/socket";
import { ChatId, EventName, MessageItem } from "@repo/types";

import { services } from "~/services";
import { utils } from "~/utils";

export const sendMessage: SocketOnHandler<"sendMessage"> = async (
	socket,
	data
) => {
	const { targetParticipantId, messageText } = data;

	const { chatId, createdAt, messageId, senderId } =
		await services.privateChat.sendMessage({
			currentSessionId: socket.sessionId,
			messageText,
			targetParticipantId,
		});

	const returnData: { addedMessage: MessageItem; chatId: ChatId } = {
		addedMessage: {
			createdAt,
			messageId,
			messageText,
			sender: {
				senderId,
			},
		},
		chatId,
	};

	socket
		.to(targetParticipantId)
		.emit<EventName>(
			"sendMessage",
			utils.createSuccessResponse("sendMessage", returnData)
		);

	return {
		data: returnData,
	};
};
