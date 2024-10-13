import {
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import { COOKIE_NAMES } from "~/constants";
import { SessionService } from "~/modules/session/session.service";

@Injectable()
export class SessionIdMiddleware implements NestMiddleware {
	constructor(private sessionService: SessionService) {}

	async use(req: Request, _res: Response, next: NextFunction) {
		const session = req.cookies[COOKIE_NAMES.SESSION];
		if (!session) throw new UnauthorizedException("SESSION_NOT_FOUND");

		const verifiedSession = await this.sessionService.verify(session);
		req.sessionId = this.sessionService.getSessionId(verifiedSession);

		next();
	}
}
