import type {
	OnGatewayInit } from "@nestjs/websockets";
import {
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import type { Server } from "socket.io";

import type { SessionService } from "../session/session.service";

@WebSocketGateway()
export class AuthGateway implements OnGatewayInit {
	@WebSocketServer() server: Server;

	constructor(private sessionService: SessionService) {}

	afterInit(server: Server) {
		server.use(async (socket, next) => {
			// FIXME: Remove `handshake.auth`
			const session =
				socket.handshake.auth.session ||
				(socket.handshake.headers.cookie || "").split("SESSION=")[1];

			// TODO: Throw an error
			if (!session) return next();

			const verifiedSession = await this.sessionService.verify(session);
			const sessionId = this.sessionService.getSessionId(verifiedSession);

			socket.sessionId = sessionId;

			next();
		});
	}
}
