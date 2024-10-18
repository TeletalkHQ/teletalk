import { PrivateChatItem } from "@repo/types";
import chai from "chai";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.unitSuccessDescribe("sendMessage", "service"), () => {
	it(
		messageCreators.unitSuccessTest(
			"sendMessage",
			"service",
			"should be able to send private message to someone"
		),
		async () => {
			const { user: currentUser, sessionId } = await randomizer.serviceUser();
			const { user: targetUser } = await randomizer.serviceUser();

			const length = 10;

			for (let i = 0; i < length; i++) {
				const sendingMessageText = randomizer.messageText();

				const addedMessageInfo = await services.privateChat.sendMessage({
					currentSessionId: sessionId,
					targetParticipantId: targetUser.userId,
					messageText: sendingMessageText,
				});

				const privateChat = (await services.privateChat.findByChatId({
					chatId: addedMessageInfo.chatId,
				})) as PrivateChatItem;

				const savedMessageItem = privateChat.messages.at(i)!;

				const isParticipantIdExistInParticipants =
					privateChat.participants.some(
						(i) => i.participantId === currentUser.userId
					);
				chai.expect(isParticipantIdExistInParticipants).to.be.equal(true);

				const isTargetUserIdExistInParticipants = privateChat.participants.some(
					(i) => i.participantId === targetUser.userId
				);
				chai.expect(isTargetUserIdExistInParticipants).to.be.equal(true);

				assertion()
					.chatId({
						test: addedMessageInfo.chatId,
						equal: privateChat.chatId,
					})
					.messageText({
						equal: sendingMessageText,
						test: savedMessageItem.messageText,
					})
					.messageId({
						test: savedMessageItem.messageId,
						equal: addedMessageInfo.messageId,
					})
					.userId({
						equal: currentUser.userId,
						test: savedMessageItem.sender.senderId,
					});
			}
		}
	);
});

await utils.generateServiceFailTest("sendMessage", "CURRENT_USER_NOT_EXIST", {
	currentSessionId: randomizer.sessionId(),
	messageText: randomizer.messageText(),
	targetParticipantId: randomizer.userId(),
});

await utils.generateServiceFailTest(
	"sendMessage",
	"TARGET_USER_NOT_EXIST",
	async () => {
		const { sessionId } = await randomizer.serviceUser();

		return {
			currentSessionId: sessionId,
			messageText: randomizer.messageText(),
			targetParticipantId: randomizer.userId(),
		};
	}
);
