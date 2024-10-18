import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.e2eSuccessSuite("sendMessage", "httpRoute"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"sendMessage",
			"httpRoute",
			"should start new chat and send message"
		),
		async () => {
			const { socket, user: currentUser } = await randomizer.userByE2E();
			const { user: targetUser } = await randomizer.userByE2E();

			const messageText = "Hello! Im message";

			const { data: sendMessageResponse } = await httpHandlerCollection
				.sendMessage(socket)
				.send({
					targetParticipantId: targetUser.userId,
					messageText,
				});

			assertion()
				.chatId(
					{
						test: sendMessageResponse.chatId,
					},
					{
						stringEquality: false,
					}
				)
				.messageText({
					equal: messageText,
					test: sendMessageResponse.addedMessage.messageText,
				})
				.messageId(
					{
						test: sendMessageResponse.addedMessage.messageId,
					},
					{
						stringEquality: false,
					}
				)
				.userId({
					equal: currentUser.userId,
					test: sendMessageResponse.addedMessage.sender.senderId,
				});
		}
	);
});
