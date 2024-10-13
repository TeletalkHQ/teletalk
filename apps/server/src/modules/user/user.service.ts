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

	async update(userToUpdate: Partial<User>) {
		const user = await this.findOne(userToUpdate);
		if (!user) {
			throw new NotFoundException("USER_NOT_FOUND");
		}
		Object.assign(user, userToUpdate);
		return this.repo.save(user);
	}

	async remove(userToRemove: Partial<User>) {
		const user = await this.findOne(userToRemove);
		if (!user) {
			throw new NotFoundException("USER_NOT_FOUND");
		}
		return this.repo.remove(user);
	}
}
