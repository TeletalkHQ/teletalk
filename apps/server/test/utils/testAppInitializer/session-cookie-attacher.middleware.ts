import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import { COOKIE_NAMES } from "~/constants";
import { ErrorStoreService } from "~/modules/error-store/error-store.service";

@Injectable()
export class SessionCookieAttacher implements NestMiddleware {
	constructor(private errorStoreService: ErrorStoreService) {}

	async use(req: Request, _res: Response, next: NextFunction) {
		const session = req.headers.authorization;

		if (!session)
			return next(
				this.errorStoreService.generate("unauthorized", "SESSION_NOT_FOUND")
			);

		req.cookies[COOKIE_NAMES.SESSION] = session;

		next();
	}
}
