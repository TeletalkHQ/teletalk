import { models } from "@repo/validator";
import { ValidationSchema } from "fastest-validator";

import { socketEventBuilder } from "~/classes/SocketEventBuilder";

import { privateChatHandlers } from "./handlers";

const builder = socketEventBuilder();

const messageItemSchema = {
	type: "object",
	createdAt: models.validation.createdAt,
	messageId: models.validation.messageId,
	messageText: models.validation.messageText,
	sender: {
		type: "object",
		props: {
			senderId: models.validation.senderId,
		},
	},
};

const privateChatSchema: ValidationSchema = {
	type: "object",
	chatId: models.validation.chatId,
	createdAt: models.validation.createdAt,
	messages: {
		type: "array",
		items: messageItemSchema,
	},
	participants: {
		type: "array",
		items: {
			participantId: models.validation.participantId,
		},
	},
};

const getChatInfo = builder
	.create<"getChatInfo">()
	.handler(privateChatHandlers.getChatInfo)
	.name("getChatInfo")
	.inputSchema({
		chatId: models.validation.chatId,
	})
	.outputSchema({
		chatInfo: {
			type: "object",
			props: {
				chatId: models.validation.chatId,
				createdAt: models.validation.createdAt,
				participants: {
					type: "array",
					items: {
						type: "object",
						participantId: models.validation.participantId,
					},
				},
			},
		},
	})
	.build();

const getPrivateChat = builder
	.create<"getPrivateChat">()
	.handler(privateChatHandlers.getPrivateChat)
	.name("getPrivateChat")
	.inputSchema({
		chatId: models.validation.chatId,
	})
	.outputSchema({
		privateChat: privateChatSchema,
	})
	.build();

const getPrivateChats = builder
	.create<"getPrivateChats">()
	.handler(privateChatHandlers.getPrivateChats)
	.name("getPrivateChats")
	.outputSchema({
		privateChats: {
			type: "array",
			items: privateChatSchema,
		},
	})
	.build();

const sendMessage = builder
	.create<"sendMessage">()
	.handler(privateChatHandlers.sendMessage)
	.name("sendMessage")
	.inputSchema({
		messageText: models.validation.messageText,
		targetParticipantId: models.validation.targetParticipantId,
	})
	.outputSchema({
		chatId: models.validation.chatId,
		addedMessage: messageItemSchema,
	})
	.build();

export const privateChat = {
	events: [getChatInfo, getPrivateChat, getPrivateChats, sendMessage],
	handlers: privateChatHandlers,
};
