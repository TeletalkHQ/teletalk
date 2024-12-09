import { Logger } from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from "@nestjs/websockets";
import type {
	BaseSchema,
	IOCollection,
	SocketHandlerReturnType_Promise,
	SocketRequestBody } from "@repo/schema";
import {
	getEventName,
} from "@repo/schema";
import type { Socket } from "socket.io";

import { BaseGateway } from "../ws/base/base.gateway";
import type { PrivateChatService } from "./private-chat.service";

@WebSocketGateway()
export class PrivateChatGateway extends BaseGateway {
	logger = new Logger(PrivateChatGateway.name);

	constructor(private privateChatService: PrivateChatService) {
		super();
	}

	// TODO: Remove?
	@SubscribeMessage("message")
	handleMessage(
		@MessageBody() message: string,
		@ConnectedSocket() client: Socket
	) {
		this.logger.log(
			`UserGateway: Received message from ${client.id}: ${message}`
		);

		this.server.emit("message", `Server received: ${message}`);
	}

	@SubscribeMessage(getEventName("sendMessage"))
	async sendMessage(
		@MessageBody() body: SocketRequestBody<IOCollection["sendMessage"]>,
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<IOCollection["sendMessage"]> {
		const { targetParticipantId, messageText } = body.data;

		const { chatId, newMessage } = await this.privateChatService.sendMessage({
			sessionId: socket.sessionId,
			messageText,
			targetParticipantId,
		});

		const returnData: {
			addedMessage: BaseSchema.MessagesItem;
			chatId: BaseSchema.ChatId;
		} = {
			addedMessage: newMessage,
			chatId,
		};

		// socket
		// 	.to(targetParticipantId)
		// 	.emit<EventName>(
		// 		"sendMessage",
		// 		utils.createSuccessResponse("sendMessage", returnData)
		// 	);

		return {
			data: returnData,
		};
	}

	@SubscribeMessage(getEventName("getOnePrivateChat"))
	async getOnePrivateChat(
		@MessageBody() body: SocketRequestBody<IOCollection["getOnePrivateChat"]>
	): SocketHandlerReturnType_Promise<IOCollection["getOnePrivateChat"]> {
		const privateChat = await this.privateChatService.getPrivateChatByChatId(
			body.data.chatId
		);

		return {
			data: {
				privateChat,
			},
		};
	}

	@SubscribeMessage(getEventName("getPrivateChats"))
	async getPrivateChats(
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<IOCollection["getPrivateChats"]> {
		const privateChats = await this.privateChatService.getCurrentUserChats(
			socket.sessionId
		);

		return {
			data: {
				privateChats,
			},
		};
	}
}
