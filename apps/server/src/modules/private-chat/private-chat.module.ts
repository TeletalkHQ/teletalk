import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UserModule } from "../user/user.module";
import { PrivateChat, PrivateChatSchema } from "./private-chat.entity";
import { PrivateChatGateway } from "./private-chat.gateway";
import { PrivateChatService } from "./private-chat.service";

@Module({
	imports: [
		UserModule,
		MongooseModule.forFeature([
			{ name: PrivateChat.name, schema: PrivateChatSchema },
		]),
	],
	controllers: [],
	providers: [PrivateChatService, PrivateChatGateway],
	exports: [PrivateChatService],
})
export class PrivateChatModule {}
