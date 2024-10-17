import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import { COOKIE_NAMES } from "~/constants";
import { ErrorStoreService } from "~/modules/error-store/error-store.service";
import { SessionService } from "~/modules/session/session.service";

@Injectable()
export class SessionIdMiddleware implements NestMiddleware {
	constructor(
		private sessionService: SessionService,
		private errorStoreService: ErrorStoreService
	) {}

	async use(req: Request, _res: Response, next: NextFunction) {
		if (!req.cookies)
			this.errorStoreService.throw("internal", "COOKIES_NOT_FOUND");

		const session = req.cookies[COOKIE_NAMES.SESSION];

		if (!session)
			this.errorStoreService.throw("unauthorized", "SESSION_NOT_FOUND");

		const verifiedSession = await this.sessionService.verify(session);
		req.sessionId = this.sessionService.getSessionId(verifiedSession);

		next();
	}
}
