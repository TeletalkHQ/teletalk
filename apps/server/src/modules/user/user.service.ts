import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseSchema } from "@repo/schema";
import { MongoRepository } from "typeorm";

import { EntityFilterer } from "~/types";

import { ErrorStoreService } from "../error-store/error-store.service";
import { User } from "./user.entity";

type DBUserData = EntityFilterer<User>;

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private repo: MongoRepository<DBUserData>,
		private errorStoreService: ErrorStoreService
	) {}

	create(userToCreate: Partial<DBUserData>) {
		const user = this.repo.create(userToCreate);
		return this.repo.save(user);
	}

	findOne(user: Partial<DBUserData>) {
		return this.repo.findOne({
			where: user,
		});
	}

	findBySessionId(sessionId: BaseSchema.SessionId) {
		return this.repo.findOne({
			where: {
				sessions: {
					$elemMatch: {
						sessionId,
						isExpired: false,
					},
				},
			},
		});
	}

	find(user: Partial<DBUserData>) {
		return this.repo.find({
			where: user,
		});
	}

	async update(
		dataToFind: Partial<DBUserData>,
		dataToUpdate: Partial<DBUserData>
	) {
		const user = await this.findOne(dataToFind);
		if (!user)
			this.errorStoreService.throw(
				"notFound",
				"USER_NOT_FOUND",
				UserService.name
			);

		return this.repo.save({ ...user, ...dataToUpdate });
	}

	async remove(userToRemove: Partial<DBUserData>) {
		const user = await this.findOne(userToRemove);
		if (!user)
			this.errorStoreService.throw(
				"notFound",
				"USER_NOT_FOUND",
				UserService.name
			);

		return this.repo.remove(user);
	}

	async isExist(userToFind: Partial<DBUserData>) {
		return this.repo.exists({
			where: userToFind,
		});
	}

	async addSessionId(
		userId: BaseSchema.UserId,
		sessionId: BaseSchema.SessionId
	) {
		const user = await this.findOne({ userId });
		if (!user)
			this.errorStoreService.throw(
				"notFound",
				"USER_NOT_FOUND",
				UserService.name
			);

		this.repo.save({
			...user,
			sessions: [...user.sessions, { sessionId }],
		});
	}
}
