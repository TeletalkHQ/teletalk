import { assertion } from "@repo/classes";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("removeBlock", "event"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"removeBlock",
			"event",
			"should remove user from blacklist"
		),
		async () => {
			const { socket } = await randomizer.userByE2E();
			const { userInfo: targetUserInfo } = await randomizer.userByE2E();

			await eventHandlerCollection.addBlock(socket).send({
				data: {
					userId: targetUserInfo.userId,
				},
			});

			const {
				data: { unblockedUser },
			} = await eventHandlerCollection.removeBlock(socket).send({
				data: {
					userId: targetUserInfo.userId,
				},
			});

			assertion().userId({
				test: unblockedUser.userId,
				equal: targetUserInfo.userId,
			});
		}
	);
});
