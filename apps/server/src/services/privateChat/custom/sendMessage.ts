import { randomMaker } from "@repo/classes";
import { HydratedPrivateChat, HydratedUser, models } from "@repo/model";
import {
	ChatId,
	CreatedAt,
	MessageId,
	MessageText,
	SenderId,
	SessionId,
	UserId,
} from "@repo/type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";

const chatModels = models.native;

export const sendMessage = serviceBuilder
	.create<
		{
			currentSessionId: SessionId;
			targetParticipantId: UserId;
			messageText: MessageText;
		},
		{
			chatId: ChatId;
			createdAt: CreatedAt;
			messageId: MessageId;
			senderId: SenderId;
		},
		{
			privateChat: HydratedPrivateChat;
			currentParticipant: HydratedUser;
		}
	>()
	.setBeforeRunMiddlewares(
		serviceMiddlewares.findCurrentParticipant,
		serviceMiddlewares.findTargetParticipant,
		serviceMiddlewares.throwIfParticipantIsBlacklisted,
		serviceMiddlewares.createPrivateChatIfNotExist,
		serviceMiddlewares.findPrivateChat
	)
	.setBody(async (data) => {
		const newMessage = {
			createdAt: Date.now(),
			messageId: randomMaker.id(chatModels.messageId.max),
			messageText: data.messageText,
			sender: {
				senderId: data.currentParticipant.userId,
			},
		};

		data.privateChat.messages.push(newMessage);
		await data.privateChat.save();

		return {
			chatId: data.privateChat.chatId,
			createdAt: newMessage.createdAt,
			messageId: newMessage.messageId,
			senderId: data.currentParticipant.userId,
		};
	})
	.build();
