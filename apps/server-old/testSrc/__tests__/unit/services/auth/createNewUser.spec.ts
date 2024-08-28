import { userUtils } from "@repo/classes";
import { DBUserData } from "@repo/types";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("createNewUser", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"createNewUser",
				"service",
				"should successfully create new user"
			),
			async () => {
				const userData: DBUserData = {
					...userUtils.getDBDefaultUserData(),
					...randomMaker.unusedContact(),
				};

				await services.user.createNewUser(userData);

				const foundUser = await services.user.findByUserId({
					targetUserId: userData.userId,
				});

				assertion().dbUserData({
					testValue: foundUser,
					equalValue: userData,
				});
			}
		);
	}
);

await utils.generateServiceFailTest("createNewUser", "USER_EXIST", async () => {
	const userData: DBUserData = {
		...userUtils.getDBDefaultUserData(),
		...randomMaker.unusedContact(),
	};

	await services.user.createNewUser(userData);

	return userData;
});
