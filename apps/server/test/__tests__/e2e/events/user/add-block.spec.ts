import { assertion } from "@repo/classes";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("addBlock", "event"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"addBlock",
			"event",
			"should add a user to blacklist"
		),
		async () => {
			const { socket } = await randomizer.userByE2E();
			const { userInfo: targetUserInfo } = await randomizer.userByE2E();

			const {
				data: { blockedUser },
			} = await eventHandlerCollection.addBlock(socket).send({
				data: {
					userId: targetUserInfo.userId,
				},
			});

			assertion().userId({
				test: blockedUser.userId,
				equal: targetUserInfo.userId,
			});
		}
	);
});
