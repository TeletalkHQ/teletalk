import { BaseSchema } from "@repo/schema";
import "express";
import { Server } from "socket.io";

declare module "express" {
  interface Request {
    sessionId: string;
  }
}

declare module "socket.io" {
	interface Socket {
		io: Server;
		sessionId: BaseSchema.SessionId;
		// use: (fn: (event: SocketMiddlewareEvent, next: SocketNext) => void) => void;
	}
}
