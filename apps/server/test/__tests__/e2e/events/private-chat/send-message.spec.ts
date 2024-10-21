import { assertion } from "@repo/classes";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("sendMessage", "httpRoute"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"sendMessage",
			"httpRoute",
			"should start new chat and send message"
		),
		async () => {
			const { socket } = await randomizer.userByE2E();
			const { userInfo: targetUserInfo } = await randomizer.userByE2E();

			const messageText = "Hello! Im message";

			const {
				data: { addedMessage },
			} = await eventHandlerCollection.sendMessage(socket).send({
				data: {
					targetParticipantId: targetUserInfo.userId,
					messageText,
				},
			});

			assertion().oneMessage({
				test: addedMessage,
			});
		}
	);
});
