import { extractor } from "@repo/classes";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	messageCreators.unitSuccessDescribe("getPublicInfo", "service"),
	() => {
		it(
			messageCreators.unitSuccessTest(
				"getPublicInfo",
				"service",
				"should add new blacklist item with target user id"
			),
			async () => {
				const { user: currentUser } = await randomizer.serviceUser();

				const { publicInfo } = await services.user.getPublicInfo({
					targetUserId: currentUser.userId,
				});

				assertion().userPublicData({
					test: publicInfo,
					equal: extractor.userPublicData(currentUser),
				});
			}
		);
	}
);

await utils.generateServiceFailTest("getPublicInfo", "TARGET_USER_NOT_EXIST", {
	targetUserId: randomizer.userId(),
});
