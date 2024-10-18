import { BlackList, DBUserData } from "@repo/types";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.unitSuccessDescribe("addBlock", "service"), () => {
	it(
		messageCreators.unitSuccessTest(
			"addBlock",
			"service",
			"should add new blacklist item with target user id"
		),
		async () => {
			const { user: currentUser, sessionId: currentSessionId } =
				await randomizer.serviceUser();

			const blockingUsers: BlackList = [];

			const length = 10;

			const users = await Promise.all(randomizer.serviceBatchUsers(length));

			for (const { user: targetUser } of users) {
				await services.user.addBlock({
					targetUserId: targetUser.userId,
					currentSessionId,
				});

				blockingUsers.push({ userId: targetUser.userId });

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

await utils.generateServiceFailTest("addBlock", "CURRENT_USER_NOT_EXIST", {
	currentSessionId: randomizer.userId(),
	targetUserId: randomizer.userId(),
});

await utils.generateServiceFailTest(
	"addBlock",
	"TARGET_USER_NOT_EXIST",
	async () => {
		const { sessionId } = await randomizer.serviceUser();

		return {
			currentSessionId: sessionId,
			targetUserId: randomizer.userId(),
		};
	}
);

await utils.generateServiceFailTest(
	"addBlock",
	"BLACKLIST_ITEM_EXIST",
	async () => {
		const { sessionId } = await randomizer.serviceUser();
		const { user: targetUser } = await randomizer.serviceUser();

		await services.user.addBlock({
			currentSessionId: sessionId,
			targetUserId: targetUser.userId,
		});

		return {
			currentSessionId: sessionId,
			targetUserId: targetUser.userId,
		};
	}
);
