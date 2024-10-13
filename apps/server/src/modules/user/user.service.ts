import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseSchema } from "@repo/schema";
import { Repository } from "typeorm";

import { User } from "./user.entity";

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private repo: Repository<User>) {}

	create(userToCreate: Partial<BaseSchema.DBUserData>) {
		const user = this.repo.create(userToCreate);

		return this.repo.save(user);
	}

	findOne(user: Partial<BaseSchema.DBUserData>) {
		return this.repo.findOne({
			where: user,
		});
	}

	find(user: Partial<BaseSchema.DBUserData>) {
		return this.repo.find({
			where: user,
		});
	}

	async update(
		dataToFind: Partial<BaseSchema.DBUserData>,
		dataToUpdate: Partial<BaseSchema.DBUserData>
	) {
		const user = await this.findOne(dataToFind);
		if (!user) {
			throw new NotFoundException("USER_NOT_FOUND");
		}

		return this.repo.save({ ...user, ...dataToUpdate });
	}

	async remove(userToRemove: Partial<BaseSchema.DBUserData>) {
		const user = await this.findOne(userToRemove);
		if (!user) {
			throw new NotFoundException("USER_NOT_FOUND");
		}
		return this.repo.remove(user);
	}

	async isExist(userToFind: Partial<BaseSchema.DBUserData>) {
		return this.repo.exists({
			where: userToFind,
		});
	}

	async addSessionId(
		userId: BaseSchema.UserId,
		sessionId: BaseSchema.SessionId
	) {
		const user = await this.findOne({ userId });
		if (!user) {
			throw new NotFoundException("USER_NOT_FOUND");
		}

		this.repo.save({
			...user,
			sessions: [...user.sessions, { sessionId }],
		});
	}
}
