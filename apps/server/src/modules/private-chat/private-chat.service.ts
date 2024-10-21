import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { randomizer } from "@repo/classes";
import { BaseSchema, baseSchema } from "@repo/schema";
import { Model } from "mongoose";

import { ErrorStoreService } from "../error-store/error-store.service";
import { UserService } from "../user/user.service";
import { PrivateChat } from "./private-chat.entity";

@Injectable()
export class PrivateChatService {
	constructor(
		@InjectModel(PrivateChat.name) private repo: Model<PrivateChat>,
		private errorStoreService: ErrorStoreService,
		private userService: UserService
	) {}

	findByParticipantId({
		currentParticipantId,
		targetParticipantId,
	}: {
		currentParticipantId: BaseSchema.UserId;
		targetParticipantId: BaseSchema.UserId;
	}) {
		return this.repo.findOne({
			"participants.participantId": {
				$all: [currentParticipantId, targetParticipantId],
			},
		});
	}

	async getPrivateChatByChatId(chatId: string) {
		const result = await this.repo.findOne({
			chatId,
		});

		if (!result)
			this.errorStoreService.throw("notFound", "PRIVATE_CHAT_NOT_FOUND", [
				PrivateChatService.name,
				this.getPrivateChatByChatId.name,
			]);

		return {
			chatId: result.chatId,
			createdAt: result.createdAt,
			messages: result.messages,
			participants: result.participants,
		} satisfies BaseSchema.PrivateChatsItem;
	}

	async getCurrentUserChats(sessionId: string) {
		const currentParticipant = await this.userService.getCurrentUser(sessionId);

		const result = await this.repo.find({
			"participants.participantId": currentParticipant.userId,
		});

		return baseSchema.privateChats.parse(result);
	}

	async getPrivateChat({
		currentParticipantId,
		targetParticipantId,
	}: {
		currentParticipantId: BaseSchema.UserId;
		targetParticipantId: BaseSchema.UserId;
	}) {
		const foundChat = await this.findByParticipantId({
			currentParticipantId,
			targetParticipantId,
		});

		if (!foundChat)
			this.errorStoreService.throw(
				"notFound",
				"PRIVATE_CHAT_NOT_FOUND",
				this.getPrivateChat.name
			);

		return foundChat;
	}

	async create({
		currentParticipantId,
		targetParticipantId,
	}: {
		currentParticipantId: BaseSchema.UserId;
		targetParticipantId: BaseSchema.UserId;
	}) {
		const isExist = await this.isPrivateChatExists({
			currentParticipantId,
			targetParticipantId,
		});
		if (isExist)
			this.errorStoreService.throw(
				"badRequest",
				"PRIVATE_CHAT_ALREADY_EXIST",
				this.create.name
			);

		const newChat = await this.repo.create({
			chatId: randomizer.chatId(),
			createdAt: Date.now(),
			participants: [
				{
					participantId: currentParticipantId,
				},
				{
					participantId: targetParticipantId,
				},
			],
		});

		await newChat.save();

		return newChat;
	}

	async update({
		currentParticipantId,
		messageText,
		targetParticipantId,
	}: {
		currentParticipantId: BaseSchema.UserId;
		messageText: BaseSchema.MessageText;
		targetParticipantId: BaseSchema.UserId;
	}) {
		const privateChat = await this.getPrivateChat({
			currentParticipantId,
			targetParticipantId,
		});

		const newMessage: BaseSchema.MessagesItem = {
			createdAt: Date.now(),
			messageId: randomizer.messageId(),
			messageText,
			sender: {
				senderId: currentParticipantId,
			},
		};

		privateChat.messages.push(newMessage);

		await privateChat.save();

		return {
			chatId: privateChat.chatId,
			newMessage,
		};
	}

	async sendMessage({
		messageText,
		sessionId,
		targetParticipantId,
	}: {
		messageText: BaseSchema.MessageText;
		sessionId: BaseSchema.SessionId;
		targetParticipantId: BaseSchema.UserId;
	}) {
		const currentParticipant = await this.userService.getCurrentUser(sessionId);

		const isExist = await this.isPrivateChatExists({
			currentParticipantId: currentParticipant.userId,
			targetParticipantId,
		});
		if (!isExist)
			await this.create({
				currentParticipantId: currentParticipant.userId,
				targetParticipantId,
			});

		return this.update({
			currentParticipantId: currentParticipant.userId,
			messageText,
			targetParticipantId,
		});
	}

	isPrivateChatExists({
		currentParticipantId,
		targetParticipantId,
	}: {
		currentParticipantId: BaseSchema.UserId;
		targetParticipantId: BaseSchema.UserId;
	}) {
		return this.repo.exists({
			"participants.participantId": {
				$all: [currentParticipantId, targetParticipantId],
			},
		});
	}
}
