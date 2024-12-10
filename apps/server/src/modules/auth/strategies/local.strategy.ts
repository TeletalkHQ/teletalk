import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import type { BaseSchema } from "@repo/schema";
import { Strategy } from "passport-local";

import { SessionService } from "~/modules/session/session.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private sessionService: SessionService) {
		super();
	}

	async validate(session: BaseSchema.EncryptedSession) {
		const user = await this.sessionService.verify(session);

		return user;
	}
}
