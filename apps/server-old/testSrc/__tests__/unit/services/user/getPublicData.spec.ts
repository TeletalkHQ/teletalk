import { extractor } from "@repo/classes";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	messageCreators.unitSuccessDescribe("getUserPublicInfo", "service"),
	() => {
		it(
			messageCreators.unitSuccessTest(
				"getUserPublicInfo",
				"service",
				"should add new blacklist item with target user id"
			),
			async () => {
				const { user: currentUser } = await randomizer.serviceUser();

				const { publicInfo } = await services.user.getUserPublicInfo({
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

await utils.generateServiceFailTest(
	"getUserPublicInfo",
	"TARGET_USER_NOT_EXIST",
	{
		targetUserId: randomizer.userId(),
	}
);
