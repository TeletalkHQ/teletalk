import { BlackList, DBUserData } from "@repo/types";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("blockUser", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"blockUser",
				"service",
				"should add new blacklist item with target user id"
			),
			async () => {
				const { user: currentUser, sessionId: currentSessionId } =
					await randomMaker.serviceUser();

				const blockingUsers: BlackList = [];

				const length = 10;

				const users = await Promise.all(randomMaker.serviceBatchUsers(length));

				for (const { user: targetUser } of users) {
					await services.user.blockUser({
						targetUserId: targetUser.userId,
						currentSessionId,
					});

					blockingUsers.push({ userId: targetUser.userId });

					const { blacklist } = (await services.user.findByUserId({
						targetUserId: currentUser.userId,
					})) as DBUserData;

					assertion().blacklist({
						testValue: blacklist,
						equalValue: blockingUsers,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest("blockUser", "CURRENT_USER_NOT_EXIST", {
	currentSessionId: randomMaker.userId(),
	targetUserId: randomMaker.userId(),
});

await utils.generateServiceFailTest(
	"blockUser",
	"TARGET_USER_NOT_EXIST",
	async () => {
		const { sessionId } = await randomMaker.serviceUser();

		return {
			currentSessionId: sessionId,
			targetUserId: randomMaker.userId(),
		};
	}
);

await utils.generateServiceFailTest(
	"blockUser",
	"BLACKLIST_ITEM_EXIST",
	async () => {
		const { sessionId } = await randomMaker.serviceUser();
		const { user: targetUser } = await randomMaker.serviceUser();

		await services.user.blockUser({
			currentSessionId: sessionId,
			targetUserId: targetUser.userId,
		});

		return {
			currentSessionId: sessionId,
			targetUserId: targetUser.userId,
		};
	}
);
