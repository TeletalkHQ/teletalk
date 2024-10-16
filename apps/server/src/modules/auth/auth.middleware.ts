import {
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from "@nestjs/common";
import { GetInput } from "@repo/schema";
import { NextFunction, Request, Response } from "express";

import { SessionStoreService } from "../session-store/session-store.service";

@Injectable()
export class AuthIdMiddleware implements NestMiddleware {
	constructor(private sessionStoreService: SessionStoreService) {}

	async use(
		req: Request<any, any, GetInput<"verify">>,
		_res: Response,
		next: NextFunction
	) {
		const tempSession = await this.sessionStoreService.find(req.sessionId);

		if (!tempSession) throw new UnauthorizedException("SESSION_NOT_FOUND");

		if (req.body.signInCode !== tempSession.signInCode)
			throw new UnauthorizedException("VERIFICATION_CODE_INVALID");

		await this.sessionStoreService.update(req.sessionId, {
			...tempSession,
			isVerified: true,
		});

		next();
	}
}
