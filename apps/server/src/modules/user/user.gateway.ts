import { Logger } from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from "@nestjs/websockets";
import { extractor } from "@repo/classes";
import { SocketHandlerReturnType_Promise } from "@repo/schema";
import { Socket } from "socket.io";

import { ErrorStoreService } from "../error-store/error-store.service";
import { BaseGateway } from "../ws/base/base.gateway";
import { UserService } from "./user.service";

@WebSocketGateway({
	cors: {
		origin: "*",
	},
	// namespace: "/user",
})
export class UserGateway extends BaseGateway {
	logger = new Logger(UserGateway.name);

	constructor(
		private errorStoreService: ErrorStoreService,
		private userService: UserService
	) {
		super();
	}

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

	@SubscribeMessage("getUserInfo")
	async handleCustomEvent(
		@ConnectedSocket() socket: Socket
	): SocketHandlerReturnType_Promise<"getUserInfo"> {
		const userData = await this.userService.findBySessionId(socket.sessionId);

		if (!userData)
			this.errorStoreService.throw(
				"notFound",
				"USER_NOT_FOUND",
				UserGateway.name
			);

		const userInfo = extractor.userInfo(userData);

		return {
			data: userInfo,
		};
	}
}
