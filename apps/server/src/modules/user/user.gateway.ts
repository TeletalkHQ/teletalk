import { Logger } from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from "@nestjs/websockets";
import { extractor } from "@repo/classes";
import {
	IOCollection,
	SocketHandlerReturnType_Promise,
	SocketRequestBody,
} from "@repo/schema";
import { getEventName } from "@repo/schema";
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
		@MessageBody() body: SocketRequestBody<IOCollection["addBlock"]>,
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<IOCollection["addBlock"]> {
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

	@SubscribeMessage(getEventName("addContactByPhone"))
	async addContactByPhone(
		@MessageBody() body: SocketRequestBody<IOCollection["addContactByPhone"]>,
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<IOCollection["addContactByPhone"]> {
		const { userId } = await this.userService.addContactByPhone({
			sessionId: socket.sessionId,
			contactToAdd: body.data,
		});

		return {
			data: {
				newContact: {
					userId,
					...extractor.cellphone(body.data),
					firstName: body.data.firstName,
					lastName: body.data.lastName,
				},
			},
		};
	}

	@SubscribeMessage(getEventName("addContactById"))
	async addContactById(
		@MessageBody() body: SocketRequestBody<IOCollection["addContactById"]>,
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<IOCollection["addContactById"]> {
		const { userId } = await this.userService.addContactById({
			sessionId: socket.sessionId,
			contactToAdd: body.data,
		});

		return {
			data: {
				newContact: {
					firstName: body.data.firstName,
					lastName: body.data.lastName,
					userId,
				},
			},
		};
	}

	@SubscribeMessage(getEventName("removeBlock"))
	async removeBlock(
		@MessageBody() body: SocketRequestBody<IOCollection["removeBlock"]>,
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<IOCollection["removeBlock"]> {
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
		@MessageBody() body: SocketRequestBody<IOCollection["removeContact"]>,
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<IOCollection["removeContact"]> {
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
	): SocketHandlerReturnType_Promise<IOCollection["getContacts"]> {
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
	): SocketHandlerReturnType_Promise<IOCollection["getUserInfo"]> {
		const userInfo = await this.userService.getUserInfo(socket.sessionId);

		return {
			data: {
				userInfo,
			},
		};
	}

	@SubscribeMessage(getEventName("getUserPublicInfo"))
	async getUserPublicInfo(
		@MessageBody() body: SocketRequestBody<IOCollection["getUserPublicInfo"]>
	): SocketHandlerReturnType_Promise<IOCollection["getUserPublicInfo"]> {
		const userPublicInfo = await this.userService.getUserPublicInfo(
			body.data.userId
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
		@MessageBody() body: SocketRequestBody<IOCollection["updateUserPublicInfo"]>
	): SocketHandlerReturnType_Promise<IOCollection["updateUserPublicInfo"]> {
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
		@MessageBody() body: SocketRequestBody<IOCollection["updateContact"]>
	): SocketHandlerReturnType_Promise<IOCollection["updateContact"]> {
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
