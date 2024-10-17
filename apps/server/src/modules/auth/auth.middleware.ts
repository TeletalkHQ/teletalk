import {
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from "@nestjs/common";
import { GetInput } from "@repo/schema";
import { NextFunction, Request, Response } from "express";

import { TempSessionStoreService } from "../temp-session-store/temp-session-store.service";

@Injectable()
export class AuthIdMiddleware implements NestMiddleware {
	constructor(private tempSessionStoreService: TempSessionStoreService) {}

	async use(
		req: Request<any, any, GetInput<"verify">>,
		_res: Response,
		next: NextFunction
	) {
		const tempSession = await this.tempSessionStoreService.find(req.sessionId);

		if (!tempSession) throw new UnauthorizedException("SESSION_NOT_FOUND");

		if (req.body.signInCode !== tempSession.signInCode)
			throw new UnauthorizedException("VERIFICATION_CODE_INVALID");

		await this.tempSessionStoreService.update(req.sessionId, {
			...tempSession,
			isVerified: true,
		});

		next();
	}
}
