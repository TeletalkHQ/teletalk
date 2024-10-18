import { ParticipantId, Participants } from "@repo/types";
import chai from "chai";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	messageCreators.e2eSuccessSuite("getPrivateChats", "httpRoute"),
	() => {
		it(
			messageCreators.e2eSuccessTest(
				"getPrivateChats",
				"httpRoute",
				"should get private chats related to session"
			),
			async () => {
				const { user: currentUser, socket: currentUserSocket } =
					await randomizer.userByE2E();
				const { user: targetUser } = await randomizer.userByE2E();

				const messageText = "Hello! Im messages!";
				await httpHandlerCollection.sendMessage(currentUserSocket).send({
					messageText,
					targetParticipantId: targetUser.userId,
				});

				const {
					data: { privateChats },
				} = await httpHandlerCollection
					.getPrivateChats(currentUserSocket)
					.send(undefined);

				for (const item of privateChats) {
					assertion().chatId(
						{
							test: item.chatId,
						},
						{
							stringEquality: false,
						}
					);

					chai
						.expect(isParticipantExist(item.participants, currentUser.userId))
						.to.be.equal(true);
					chai
						.expect(isParticipantExist(item.participants, targetUser.userId))
						.to.be.equal(true);

					const messageItem = item.messages.at(0)!;
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
			}
		);
	}
);

const isParticipantExist = (
	participants: Participants,
	participantId: ParticipantId
) => participants.some((i) => i.participantId === participantId)!;
