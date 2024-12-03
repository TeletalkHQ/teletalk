import { Injectable, NestMiddleware } from "@nestjs/common";
import { HTTPRequestBody, IOCollection } from "@repo/schema";
import { NextFunction, Request, Response } from "express";

import { ErrorStoreService } from "../error-store/error-store.service";
import { TempSessionStoreService } from "../temp-session-store/temp-session-store.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private tempSessionStoreService: TempSessionStoreService,
		private errorStoreService: ErrorStoreService
	) {}

	async use(
		req: Request<any, any, HTTPRequestBody<IOCollection["verify"]>>,
		_res: Response,
		next: NextFunction
	) {
		this.verifySignInCode(req, _res, next);
	}

	async verifySignInCode(
		req: Request<any, any, HTTPRequestBody<IOCollection["verify"]>>,
		_res: Response,
		next: NextFunction
	) {
		const tempSession = await this.tempSessionStoreService.find(req.sessionId);

		if (!tempSession)
			return next(
				this.errorStoreService.generate("notFound", "TEMP_SESSION_NOT_FOUND")
			);

		if (req.body.signInCode !== tempSession.signInCode)
			return next(
				this.errorStoreService.generate("unauthorized", "SIGN_IN_CODE_INVALID")
			);

		await this.tempSessionStoreService.update(req.sessionId, {
			...tempSession,
			isVerified: true,
		});

		next();
	}
}
