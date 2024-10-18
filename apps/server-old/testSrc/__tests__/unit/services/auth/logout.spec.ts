import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.unitSuccessDescribe("logout", "service"), () => {
	it(
		messageCreators.unitSuccessTest(
			"logout",
			"service",
			"should logout and remove the specific session"
		),
		async () => {
			const { sessionId, user: currentUser } = await randomizer.serviceUser();

			const length = 10;

			const sessions = await randomizer.sessions(length, currentUser.userId);

			sessions.push({
				sessionId,
			});

			for (const item of [...sessions]) {
				await services.user.logout({
					currentSessionId: item.sessionId,
				});

				sessions.shift();

				const user = await services.user.findByUserId({
					targetUserId: currentUser.userId,
				});

				assertion().sessions({
					test: user.sessions,
					equal: sessions,
				});
			}
		}
	);
});

// await utils.generateServiceFailTest("logout", "CURRENT_USER_NOT_EXIST", {
// 	currentSessionId: randomizer.sessionId(),
// });
