import { Injectable, NestMiddleware } from "@nestjs/common";
import { HTTPRequestBody } from "@repo/schema";
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
		req: Request<any, any, HTTPRequestBody<"verify">>,
		_res: Response,
		next: NextFunction
	) {
		this.verifySignInCode(req, _res, next);
	}

	async verifySignInCode(
		req: Request<any, any, HTTPRequestBody<"verify">>,
		_res: Response,
		next: NextFunction
	) {
		const tempSession = await this.tempSessionStoreService.find(req.sessionId);

		if (!tempSession)
			this.errorStoreService.throw(
				"notFound",
				"TEMP_SESSION_NOT_FOUND",
				AuthMiddleware.name
			);

		if (req.body.signInCode !== tempSession.signInCode)
			this.errorStoreService.throw(
				"unauthorized",
				"SIGN_IN_CODE_INVALID",
				AuthMiddleware.name
			);

		await this.tempSessionStoreService.update(req.sessionId, {
			...tempSession,
			isVerified: true,
		});

		next();
	}
}
