import { assertion, extractor } from "@repo/classes";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("getPublicInfo", "event"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"getPublicInfo",
			"event",
			"should get current user public data"
		),
		async () => {
			const { socket, userInfo } = await randomizer.userByE2E();

			const {
				data: { publicInfo },
			} = await eventHandlerCollection.getPublicInfo(socket).send({
				data: {
					userId: userInfo.userId,
				},
			});

			assertion().userPublicInfo({
				test: publicInfo,
				equal: extractor.userPublicInfo(userInfo),
			});
		}
	);

	it(
		messageCreators.e2eSuccessTest(
			"getPublicInfo",
			"event",
			"should get target user public data"
		),
		async () => {
			const { socket } = await randomizer.userByE2E();
			const { userInfo: targetUserInfo } = await randomizer.userByE2E();

			const {
				data: { publicInfo },
			} = await eventHandlerCollection.getPublicInfo(socket).send({
				data: {
					userId: targetUserInfo.userId,
				},
			});

			assertion().userPublicInfo({
				test: publicInfo,
				equal: extractor.userPublicInfo(targetUserInfo),
			});
		}
	);
});
