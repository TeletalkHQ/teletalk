import { assertion, extractor } from "@repo/classes";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("getUserPublicInfo", "event"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"getUserPublicInfo",
			"event",
			"should get current user public info"
		),
		async () => {
			const { socket, userInfo } = await randomizer.userByE2E();

			const {
				data: { publicInfo },
			} = await eventHandlerCollection.getUserPublicInfo(socket).send({
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
			"getUserPublicInfo",
			"event",
			"should get target user public info"
		),
		async () => {
			const { socket } = await randomizer.userByE2E();
			const { userInfo: targetUserInfo } = await randomizer.userByE2E();

			const {
				data: { publicInfo },
			} = await eventHandlerCollection.getUserPublicInfo(socket).send({
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
