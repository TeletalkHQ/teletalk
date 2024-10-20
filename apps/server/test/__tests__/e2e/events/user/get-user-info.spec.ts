import { assertion } from "@repo/classes";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("getUserInfo", "event"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"getUserInfo",
			"event",
			"should get current user info"
		),
		async () => {
			const { socket, userInfo } = await randomizer.userByE2E();

			const {
				data: { userInfo: receivedUserInfo },
			} = await eventHandlerCollection.getUserInfo(socket).send({ data: {} });

			assertion().userInfo({
				equal: userInfo,
				test: receivedUserInfo,
			});
		}
	);
});
