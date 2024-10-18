import { BlackList, DBUserData } from "@repo/types";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.unitSuccessDescribe("removeBlock", "service"), () => {
	it(
		messageCreators.unitSuccessTest(
			"removeBlock",
			"service",
			"should remove user from blacklist"
		),
		async () => {
			const { user: currentUser, sessionId } = await randomizer.serviceUser();

			const blockingUsers: BlackList = [];

			const length = 10;
			const users = await Promise.all(randomizer.serviceBatchUsers(length));

			for (const { user: targetUser } of users) {
				await services.user.addBlock({
					currentSessionId: sessionId,
					targetUserId: targetUser.userId,
				});

				blockingUsers.push({
					userId: targetUser.userId,
				});
			}

			for (const { user: targetUser } of [...users]) {
				await services.user.removeBlock({
					currentSessionId: sessionId,
					targetUserId: targetUser.userId,
				});

				blockingUsers.shift();

				const { blacklist } = (await services.user.findByUserId({
					targetUserId: currentUser.userId,
				})) as DBUserData;

				assertion().blacklist({
					test: blacklist,
					equal: blockingUsers,
				});
			}
		}
	);
});

await utils.generateServiceFailTest("removeBlock", "CURRENT_USER_NOT_EXIST", {
	currentSessionId: randomizer.sessionId(),
	targetUserId: randomizer.userId(),
});

await utils.generateServiceFailTest(
	"removeBlock",
	"BLACKLIST_ITEM_NOT_EXIST",
	async () => {
		const { sessionId } = await randomizer.serviceUser();

		return {
			currentSessionId: sessionId,
			targetUserId: randomizer.userId(),
		};
	}
);
