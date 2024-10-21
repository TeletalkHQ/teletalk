import { assertion } from "@repo/classes";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("getOnePrivateChat", "event"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"getOnePrivateChat",
			"event",
			"should get one private chat related to current user"
		),
		async () => {
			const { socket } = await randomizer.userByE2E();
			const { userInfo: targetUserInfo } = await randomizer.userByE2E();

			const messageText = "Hello! Im messages!";

			const {
				data: { chatId },
			} = await eventHandlerCollection.sendMessage(socket).send({
				data: {
					messageText,
					targetParticipantId: targetUserInfo.userId,
				},
			});

			const {
				data: { privateChat },
			} = await eventHandlerCollection.getOnePrivateChat(socket).send({
				data: {
					chatId,
				},
			});

			assertion().onePrivateChat({
				test: privateChat,
			});
		}
	);
});
