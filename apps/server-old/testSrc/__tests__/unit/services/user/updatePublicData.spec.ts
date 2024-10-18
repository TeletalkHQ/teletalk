import { extractor } from "@repo/classes";
import { DBUserData } from "@repo/types";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	messageCreators.unitSuccessDescribe("updatePublicInfo", "service"),
	() => {
		it(
			messageCreators.unitSuccessTest(
				"updatePublicInfo",
				"service",
				"should update user public data"
			),
			async () => {
				const { user: currentUser, sessionId } = await randomizer.serviceUser();

				const length = 10;
				const usersPublicData = randomizer.usersPublicData(
					length,
					currentUser.userId
				);

				for (const publicInfo of usersPublicData) {
					await services.user.updatePublicInfo({
						currentSessionId: sessionId,
						updateProperties: publicInfo,
					});

					const user = (await services.user.findByUserId({
						targetUserId: currentUser.userId,
					})) as DBUserData;

					assertion().userPublicData({
						test: extractor.userPublicData(user),
						equal: publicInfo,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest(
	"updatePublicInfo",
	"CURRENT_USER_NOT_EXIST",
	{
		currentSessionId: randomizer.sessionId(),
		updateProperties: randomizer.userPublicData(),
	}
);
