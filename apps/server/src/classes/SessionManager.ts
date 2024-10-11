import { randomMaker } from "@repo/classes";
import { BaseSchema, baseSchema, getStringMaxLength } from "@repo/schema";
import { JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from "jose";

import { configManager } from "~/classes/ConfigManager";

export interface SessionPayload extends JWTPayload {
	sessionId: string;
}

export interface VerifiedSession extends JWTVerifyResult {
	payload: SessionPayload;
}

class SessionManager {
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
		return randomMaker.id(getStringMaxLength(baseSchema.sessionId));
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
		return this.encodeString(configManager.getConfigs().APP.SESSION_SECRET);
	}

	private encodeString(str: string) {
		return new TextEncoder().encode(str);
	}
}

export const sessionManager = new SessionManager();
