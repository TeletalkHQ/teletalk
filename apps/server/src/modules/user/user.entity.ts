import { Logger } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "@repo/schema";
import { HydratedDocument } from "mongoose";

import { createLogger } from "~/utils";

@Schema()
export class User {
	logger: Logger;

	constructor() {
		this.logger = createLogger("entity", User.name);
	}

	@Prop()
	avatarSrc: BaseSchema.AvatarSrc;

	@Prop()
	bio: BaseSchema.Bio;

	@Prop({ default: [] })
	blacklist: BaseSchema.Blacklist;

	@Prop({ default: [] })
	contacts: BaseSchema.Contacts;

	@Prop()
	countryCode: BaseSchema.CountryCode;

	@Prop()
	countryName: BaseSchema.CountryName;

	@Prop()
	createdAt: BaseSchema.CreatedAt;

	@Prop()
	firstName: BaseSchema.FirstName;

	@Prop()
	lastName: BaseSchema.LastName;

	@Prop()
	phoneNumber: BaseSchema.PhoneNumber;

	@Prop({
		type: "object",
		default: {
			isActive: false,
		},
	})
	status: BaseSchema.Status;

	@Prop()
	userId: BaseSchema.UserId;

	@Prop()
	username: BaseSchema.Username;

	@Prop()
	email: BaseSchema.Email;

	@Prop()
	password: BaseSchema.Password;

	@Prop({ default: [] })
	sessions: BaseSchema.Sessions;

	// @AfterInsert()
	// logInsert() {
	// 	this.logger.log(`Inserted ${User.name} with id: ${this.id}`);
	// }

	// @AfterUpdate()
	// logUpdate() {
	// 	this.logger.log(`Updated ${User.name} with id: ${this.id}`);
	// }

	// @AfterRemove()
	// logRemove() {
	// 	this.logger.log(`Removed ${User.name} with id: ${this.id}`);
	// }
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
