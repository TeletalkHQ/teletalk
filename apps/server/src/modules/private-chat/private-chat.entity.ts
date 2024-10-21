import { Logger } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "@repo/schema";
import { HydratedDocument } from "mongoose";

import { createLogger } from "~/utils";

@Schema()
export class PrivateChat {
	logger: Logger;

	constructor() {
		this.logger = createLogger("entity", PrivateChat.name);
	}

	@Prop()
	chatId: BaseSchema.ChatId;

	@Prop()
	createdAt: BaseSchema.CreatedAt;

	@Prop({ default: [] })
	messages: BaseSchema.Messages;

	@Prop({ default: [] })
	participants: BaseSchema.Participants;

	// @AfterInsert()
	// logInsert() {
	// 	this.logger.log(`Inserted ${PrivateChat.name} with id: ${this.id}`);
	// }

	// @AfterUpdate()
	// logUpdate() {
	// 	this.logger.log(`Updated ${PrivateChat.name} with id: ${this.id}`);
	// }

	// @AfterRemove()
	// logRemove() {
	// 	this.logger.log(`Removed ${PrivateChat.name} with id: ${this.id}`);
	// }
}

export type PrivateChatDocument = HydratedDocument<PrivateChat>;

export const PrivateChatSchema = SchemaFactory.createForClass(PrivateChat);