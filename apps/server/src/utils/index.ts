import { Request } from "express";

export const getHostFromRequest = (req: Request) => req.headers.host;

export const crashServer = (message: unknown) => {
	console.error(message);
	process.exit(1);
};
