import { BaseSchema } from "@repo/schema";

import { Store } from "./Store";

export interface SessionItem extends BaseSchema.Cellphone {
	isVerified: boolean;
	verificationCode: string;
}

export class SessionStore extends Store {
	protected STATE_KEY = "SESSION_ID";

	async find(sessionId: BaseSchema.SessionId): Promise<SessionItem | null> {
		return super.find(sessionId);
	}

	async add(sessionId: BaseSchema.SessionId, data: SessionItem) {
		await super.add(sessionId, data);
	}

	async update(sessionId: BaseSchema.SessionId, newData: SessionItem) {
		await super.update(sessionId, newData);
	}
}

export const sessionStore = new SessionStore();
