import { Logger } from "@nestjs/common";
import { Request } from "express";

export const getHostFromRequest = (req: Request) => req.headers.host;

export const crashServer = (message: unknown) => {
	// eslint-disable-next-line no-console
	console.error(message);
	process.exit(1);
};

export type LoggerType =
	| "entity"
	| "controller"
	| "service"
	| "guard"
	| "middleware"
	| "interceptor";
export const createLogger = (type: LoggerType, name: string) =>
	new Logger(`${name}.${type}`);
