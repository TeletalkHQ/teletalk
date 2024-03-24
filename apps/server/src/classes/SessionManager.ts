import { EncryptedSession, SessionId } from "@repo/type-store";
import { SignJWT, jwtVerify } from "jose";
import { randomMaker } from "utility-store";

import { configs } from "~/classes/Configs";
import { models } from "~/models";
import { VerifiedSession } from "~/types";

class SessionManager {
	private options = {};

	getOptions() {
		return this.options;
	}

	sign(sessionId?: SessionId) {
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
		return randomMaker.id(models.native.sessionId.max);
	}

	verify(session: EncryptedSession) {
		return jwtVerify(
			session,
			this.getEncodedSecret()
		) as Promise<VerifiedSession>;
	}

	getSessionId(verifiedSession: VerifiedSession): SessionId {
		return verifiedSession.payload.sessionId;
	}

	private getEncodedSecret() {
		return this.encodeString(configs.getConfigs().APP.SESSION_SECRET);
	}

	private encodeString(str: string) {
		return new TextEncoder().encode(str);
	}
}

export const sessionManager = new SessionManager();
