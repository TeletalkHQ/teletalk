import { assertion } from "@repo/classes";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(
	messageCreators.e2eSuccessSuite("updateUserPublicInfo", "event"),
	() => {
		it(
			messageCreators.e2eSuccessTest(
				"updateUserPublicInfo",
				"event",
				"should get user public info"
			),
			async () => {
				const { socket, userInfo: currentUserInfo } =
					await randomizer.userByE2E();

				const { userId, ...publicInfoToUpdate } = randomizer.userPublicInfo();

				const {
					data: { updatedPublicInfo },
				} = await eventHandlerCollection
					.updateUserPublicInfo(socket)
					.send({ data: publicInfoToUpdate });

				assertion().userPublicInfo({
					equal: { ...publicInfoToUpdate, userId: currentUserInfo.userId },
					test: updatedPublicInfo,
				});
			}
		);
	}
);
