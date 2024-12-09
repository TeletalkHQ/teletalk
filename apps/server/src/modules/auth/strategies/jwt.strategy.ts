import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import type { ConfigService } from "~/modules/config/config.service";
import type { SessionPayload } from "~/modules/session/session.service";
import type { UserService } from "~/modules/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userService: UserService,
		configService: ConfigService
	) {
		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getConfigs().APP.SESSION_SECRET,
		});
	}

	async validate(payload: SessionPayload) {
		const user = await this.userService.findBySessionId(payload.sessionId);

		return user;
	}
}
