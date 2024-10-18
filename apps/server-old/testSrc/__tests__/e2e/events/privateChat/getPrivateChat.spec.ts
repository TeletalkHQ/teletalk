import { ParticipantId, Participants } from "@repo/types";
import chai from "chai";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.e2eSuccessSuite("getPrivateChat", "httpRoute"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"getPrivateChat",
			"httpRoute",
			"should get private chats related to session"
		),
		async () => {
			const { socket: currentUserSocket, user: currentUser } =
				await randomizer.userByE2E();
			const { user: targetUser } = await randomizer.userByE2E();

			const messageText = "Hello! Im messages!";

			const {
				data: { chatId },
			} = await httpHandlerCollection.sendMessage(currentUserSocket).send({
				messageText,
				targetParticipantId: targetUser.userId,
			});

			const {
				data: { privateChat },
			} = await httpHandlerCollection.getPrivateChat(currentUserSocket).send({
				chatId,
			});

			assertion().chatId({
				test: privateChat.chatId,
				equal: chatId,
			});

			chai
				.expect(
					isParticipantExist(privateChat.participants, currentUser.userId)
				)
				.to.be.equal(true);
			chai
				.expect(isParticipantExist(privateChat.participants, targetUser.userId))
				.to.be.equal(true);

			const messageItem = privateChat.messages.at(0)!;
			assertion()
				.messageText({
					equal: messageText,
					test: messageItem.messageText,
				})
				.messageId(
					{
						test: messageItem.messageId,
					},
					{
						stringEquality: false,
					}
				)
				.senderId({
					equal: messageItem.sender.senderId,
					test: currentUser.userId,
				});
		}
	);
});

const isParticipantExist = (
	participants: Participants,
	participantId: ParticipantId
) => participants.some((i) => i.participantId === participantId)!;
