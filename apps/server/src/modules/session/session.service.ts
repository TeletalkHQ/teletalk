import { Injectable } from "@nestjs/common";
import { randomizer } from "@repo/classes";
import { BaseSchema, baseSchema, getStringMaxLength } from "@repo/schema";
import { JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from "jose";

import { ConfigService } from "../config/config.service";
import { Environments } from "../env/env.service";

export interface SessionPayload extends JWTPayload {
	sessionId: string;
}

export interface VerifiedSession extends JWTVerifyResult {
	payload: SessionPayload;
}

@Injectable()
export class SessionService {
	private SESSION_SECRET: Environments["SESSION_SECRET"];

	constructor(private configService: ConfigService) {
		this.SESSION_SECRET = this.configService.getConfigs().APP.SESSION_SECRET;
	}

	sign(sessionId?: BaseSchema.SessionId) {
		return new SignJWT({
			sessionId: sessionId ?? this.generateSessionId(),
		})
			.setProtectedHeader({
				alg: "HS256",
			})
			.setIssuedAt()
			.sign(this.getEncodedSecret());
	}

	generateSessionId() {
		return randomizer.id(getStringMaxLength(baseSchema.sessionId));
	}

	verify(session: BaseSchema.EncryptedSession) {
		return jwtVerify(
			session,
			this.getEncodedSecret()
		) as Promise<VerifiedSession>;
	}

	getSessionId(verifiedSession: VerifiedSession): BaseSchema.SessionId {
		return verifiedSession.payload.sessionId;
	}

	private getEncodedSecret() {
		return this.encodeString(this.SESSION_SECRET);
	}

	private encodeString(str: string) {
		return new TextEncoder().encode(str);
	}
}
