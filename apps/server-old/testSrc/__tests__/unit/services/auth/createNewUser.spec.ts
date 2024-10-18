import { userUtils } from "@repo/classes";
import { DBUserData } from "@repo/types";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	messageCreators.unitSuccessDescribe("createNewUser", "service"),
	() => {
		it(
			messageCreators.unitSuccessTest(
				"createNewUser",
				"service",
				"should successfully create new user"
			),
			async () => {
				const userData: DBUserData = {
					...userUtils.getDBDefaultUserData(),
					...randomizer.unusedContact(),
				};

				await services.user.createNewUser(userData);

				const foundUser = await services.user.findByUserId({
					targetUserId: userData.userId,
				});

				assertion().dbUserData({
					test: foundUser,
					equal: userData,
				});
			}
		);
	}
);

await utils.generateServiceFailTest("createNewUser", "USER_EXIST", async () => {
	const userData: DBUserData = {
		...userUtils.getDBDefaultUserData(),
		...randomizer.unusedContact(),
	};

	await services.user.createNewUser(userData);

	return userData;
});
