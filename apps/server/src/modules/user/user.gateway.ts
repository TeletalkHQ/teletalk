import { Logger } from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from "@nestjs/websockets";
import {
	SocketHandlerReturnType_Promise,
	SocketRequestBody,
	getEventName,
} from "@repo/schema";
import { Socket } from "socket.io";

import { BaseGateway } from "../ws/base/base.gateway";
import { UserService } from "./user.service";

@WebSocketGateway()
export class UserGateway extends BaseGateway {
	logger = new Logger(UserGateway.name);

	constructor(private userService: UserService) {
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

	@SubscribeMessage(getEventName("addBlock"))
	async addBlock(
		@MessageBody() body: SocketRequestBody<"addBlock">,
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<"addBlock"> {
		await this.userService.addBlock({
			sessionId: socket.sessionId,
			targetUserId: body.data.userId,
		});

		return {
			data: {
				blockedUser: {
					userId: body.data.userId,
				},
			},
		};
	}

	@SubscribeMessage(getEventName("addContact"))
	async addContact(
		@MessageBody() body: SocketRequestBody<"addContact">,
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<"addContact"> {
		const newContact = await this.userService.addContact({
			sessionId: socket.sessionId,
			targetUserInfo: body.data,
		});

		return {
			data: {
				newContact,
			},
		};
	}

	@SubscribeMessage(getEventName("removeBlock"))
	async removeBlock(
		@MessageBody() body: SocketRequestBody<"removeBlock">,
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<"removeBlock"> {
		await this.userService.removeBlock({
			sessionId: socket.sessionId,
			targetUserId: body.data.userId,
		});

		return {
			data: {
				unblockedUser: {
					userId: body.data.userId,
				},
			},
		};
	}

	@SubscribeMessage(getEventName("removeContact"))
	async removeContact(
		@MessageBody() body: SocketRequestBody<"removeContact">,
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<"removeContact"> {
		await this.userService.removeContact({
			sessionId: socket.sessionId,
			targetUserId: body.data.userId,
		});

		return {
			data: {
				removedContact: {
					userId: body.data.userId,
				},
			},
		};
	}

	@SubscribeMessage(getEventName("getContacts"))
	async getContacts(
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<"getContacts"> {
		const contacts = await this.userService.getContacts(socket.sessionId);

		return {
			data: {
				contacts,
			},
		};
	}

	@SubscribeMessage(getEventName("getUserInfo"))
	async getUserInfo(
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<"getUserInfo"> {
		const userInfo = await this.userService.getUserInfo(socket.sessionId);

		console.log("userInfo:", userInfo);

		return {
			data: {
				userInfo,
			},
		};
	}

	@SubscribeMessage(getEventName("getUserPublicInfo"))
	async getUserPublicInfo(
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<"getUserPublicInfo"> {
		const userPublicInfo = await this.userService.getUserPublicInfo(
			socket.sessionId
		);

		return {
			data: {
				userPublicInfo,
			},
		};
	}

	@SubscribeMessage(getEventName("updateUserPublicInfo"))
	async updateUserPublicInfo(
		@ConnectedSocket() socket: Socket,
		@MessageBody() body: SocketRequestBody<"updateUserPublicInfo">
	): SocketHandlerReturnType_Promise<"updateUserPublicInfo"> {
		const updatedPublicInfo = await this.userService.updateUserPublicInfo(
			socket.sessionId,
			body.data
		);

		return {
			data: {
				updatedPublicInfo,
			},
		};
	}

	@SubscribeMessage(getEventName("updateContact"))
	async updateContact(
		@ConnectedSocket() socket: Socket,
		@MessageBody() body: SocketRequestBody<"updateContact">
	): SocketHandlerReturnType_Promise<"updateContact"> {
		const updatedContact = await this.userService.updateContact(
			socket.sessionId,
			body.data
		);

		return {
			data: {
				updatedContact,
			},
		};
	}
}
