import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

const requestCounts = new Map<string, { count: number; lastRequest: number }>();

@WebSocketGateway()
export class WsRateLimitGateway {
	@WebSocketServer() server: Server;

	@SubscribeMessage("message")
	handleMessage(
		@ConnectedSocket() client: Socket,
		@MessageBody() message: string
	) {
		const currentTime = Date.now();
		const clientData = requestCounts.get(client.id) || {
			count: 0,
			lastRequest: 0,
		};

		if (currentTime - clientData.lastRequest < 1000) {
			// 1 second limit
			clientData.count += 1;
		} else {
			clientData.count = 1;
		}

		clientData.lastRequest = currentTime;
		requestCounts.set(client.id, clientData);

		if (clientData.count > 5) {
			// Max 5 requests per second
			client.emit("error", "Rate limit exceeded");
		} else {
			this.server.emit("message", message); // Handle message normally
		}
	}
}
