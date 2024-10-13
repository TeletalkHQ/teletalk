import { Inject, Injectable } from "@nestjs/common";
import { BaseSchema } from "@repo/schema";

import { StoreService } from "../store/store.service";

export interface SessionItem extends BaseSchema.Cellphone {
	isVerified: boolean;
	signInCode: string;
}

@Injectable()
export class SessionStoreService {
	constructor(@Inject(StoreService) private readonly store: StoreService) {
		this.store.setStoreKey("SESSION_ID");
	}

	async find(sessionId: BaseSchema.SessionId): Promise<SessionItem | null> {
		return this.store.find(sessionId);
	}

	async add(sessionId: BaseSchema.SessionId, data: SessionItem) {
		await this.store.add(sessionId, data);
	}

	async update(sessionId: BaseSchema.SessionId, newData: SessionItem) {
		await this.store.update(sessionId, newData);
	}

	async remove(sessionId: BaseSchema.SessionId) {
		await this.store.remove(sessionId);
	}
}
