import { nativeModelBuilder } from "../../classes";
import {
	ChatId,
	MessageId,
	MessageText,
	Messages,
	Participants,
	PrivateChats,
} from "../../types";
import { commonModels } from "./common";

export const privateChatModels = {
	chatId: nativeModelBuilder
		//TODO: Move interface to collection, like IO
		.create<ChatId>()
		.type("string")
		.required(true)
		.empty(false)
		.min(30)
		.max(35)
		.trim(true)
		.unique(true)
		.build(),
	createdAt: commonModels.createdAt,
	messageId: nativeModelBuilder
		.create<MessageId>()
		.type("string")
		.required(true)
		.empty(false)
		.max(45)
		.min(40)
		.trim(true)
		.unique(true)
		.build(),
	messages: nativeModelBuilder
		.create<Messages>()
		.type("array")
		.required(true)
		.empty(true)
		.build(),
	messageText: nativeModelBuilder
		.create<MessageText>()
		.type("string")
		.required(true)
		.empty(false)
		.min(1)
		.max(1000)
		.trim(true)
		.build(),
	participantId: commonModels.id,
	participants: nativeModelBuilder
		.create<Participants>()
		.type("array")
		.required(true)
		.length(2)
		.empty(false)
		.build(),
	privateChats: nativeModelBuilder
		.create<PrivateChats>()
		.type("array")
		.required(true)
		.build(),
	senderId: commonModels.id,
	get targetParticipantId() {
		return this.participantId;
	},
};
