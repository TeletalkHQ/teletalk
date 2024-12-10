import { Logger, UseInterceptors } from "@nestjs/common";
import { OnGatewayInit } from "@nestjs/websockets";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

import { BaseInterceptor } from "./base.interceptor";

@UseInterceptors(BaseInterceptor)
@WebSocketGateway()
export class BaseGateway implements OnGatewayInit {
	logger = new Logger(BaseGateway.name);

	@WebSocketServer() server: Server;

	afterInit(_server: Server) {
		this.logger.log("Initialized WebSocket Server");
	}
}
