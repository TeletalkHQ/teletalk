import {
	GetChatInfoIO,
	GetPrivateChatIO,
	GetPrivateChatsIO,
	SendMessageIO,
} from "@repo/type-store";

import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import { validationModels } from "~/models/validation";
import { ValidationSchema } from "~/types";

import { privateChatHandlers } from "./handlers";

const builder = socketEventBuilder();

const messageItemSchema = {
	type: "object",
	createdAt: validationModels.createdAt,
	messageId: validationModels.messageId,
	messageText: validationModels.messageText,
	sender: {
		type: "object",
		props: {
			senderId: validationModels.senderId,
		},
	},
};

const privateChatSchema: ValidationSchema = {
	type: "object",
	chatId: validationModels.chatId,
	createdAt: validationModels.createdAt,
	messages: {
		type: "array",
		items: messageItemSchema,
	},
	participants: {
		type: "array",
		items: {
			participantId: validationModels.participantId,
		},
	},
};

const getChatInfo = builder
	.create<GetChatInfoIO>()
	.handler(privateChatHandlers.getChatInfo)
	.name("getChatInfo")
	.inputSchema({
		chatId: validationModels.chatId,
	})
	.outputSchema({
		chatInfo: {
			type: "object",
			props: {
				chatId: validationModels.chatId,
				createdAt: validationModels.createdAt,
				participants: {
					type: "array",
					items: {
						type: "object",
						participantId: validationModels.participantId,
					},
				},
			},
		},
	})
	.build();

const getPrivateChat = builder
	.create<GetPrivateChatIO>()
	.handler(privateChatHandlers.getPrivateChat)
	.name("getPrivateChat")
	.inputSchema({
		chatId: validationModels.chatId,
	})
	.outputSchema({
		privateChat: privateChatSchema,
	})
	.build();

const getPrivateChats = builder
	.create<GetPrivateChatsIO>()
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
	.create<SendMessageIO>()
	.handler(privateChatHandlers.sendMessage)
	.name("sendMessage")
	.inputSchema({
		messageText: validationModels.messageText,
		targetParticipantId: validationModels.targetParticipantId,
	})
	.outputSchema({
		chatId: validationModels.chatId,
		addedMessage: messageItemSchema,
	})
	.build();

export const privateChat = {
	events: [getChatInfo, getPrivateChat, getPrivateChats, sendMessage],
	handlers: privateChatHandlers,
};
