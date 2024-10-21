import { assertion } from "@repo/classes";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

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
				const { socket } = await randomizer.userByE2E();
				const { userInfo: targetUserInfo } = await randomizer.userByE2E();

				const messageText = "Hello! Im messages!";
				await eventHandlerCollection.sendMessage(socket).send({
					data: {
						messageText,
						targetParticipantId: targetUserInfo.userId,
					},
				});

				const {
					data: { privateChats },
				} = await eventHandlerCollection
					.getPrivateChats(socket)
					.send({ data: {} });

				assertion().privateChats({
					test: privateChats,
				});
			}
		);
	}
);
