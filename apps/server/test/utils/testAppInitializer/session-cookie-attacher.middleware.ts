import {
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import { COOKIE_NAMES } from "~/constants";

@Injectable()
export class SessionCookieAttacher implements NestMiddleware {
	constructor() {}

	async use(req: Request, _res: Response, next: NextFunction) {
		const session = req.headers.authorization;

		if (!session) throw new UnauthorizedException("SESSION_NOT_FOUND");

		req.cookies[COOKIE_NAMES.SESSION] = session;

		next();
	}
}
