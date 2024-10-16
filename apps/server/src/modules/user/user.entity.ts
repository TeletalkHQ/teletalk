import { Logger } from "@nestjs/common";
import { BaseSchema } from "@repo/schema";
import {
	AfterInsert,
	AfterRemove,
	AfterUpdate,
	Column,
	Entity,
	ObjectId,
	ObjectIdColumn,
} from "typeorm";

import { createLogger } from "~/utils";

@Entity()
export class User {
	logger: Logger;

	constructor() {
		this.logger = createLogger("entity", User.name);
	}

	@ObjectIdColumn()
	id: ObjectId;

	@Column()
	avatarSrc: BaseSchema.AvatarSrc;

	@Column()
	bio: BaseSchema.Bio;

	@Column({ default: [], type: "jsonb" })
	blacklist: BaseSchema.Blacklist;

	@Column({ default: [], type: "jsonb" })
	contacts: BaseSchema.Contacts;

	@Column()
	countryCode: BaseSchema.CountryCode;

	@Column()
	countryName: BaseSchema.CountryName;

	@Column()
	createdAt: BaseSchema.CreatedAt;

	@Column()
	firstName: BaseSchema.FirstName;

	@Column()
	lastName: BaseSchema.LastName;

	@Column()
	phoneNumber: BaseSchema.PhoneNumber;

	@Column()
	status: BaseSchema.Status;

	@Column()
	userId: BaseSchema.UserId;

	@Column()
	username: BaseSchema.Username;

	@Column()
	email: BaseSchema.Email;

	@Column()
	password: BaseSchema.Password;

	@Column({ default: [], type: "jsonb" })
	sessions: BaseSchema.Sessions;

	@AfterInsert()
	logInsert() {
		this.logger.log(`Inserted User with id: ${this.id}`);
	}

	@AfterUpdate()
	logUpdate() {
		this.logger.log(`Updated User with id: ${this.id}`);
	}

	@AfterRemove()
	logRemove() {
		this.logger.log(`Removed User with id: ${this.id}`);
	}
}
