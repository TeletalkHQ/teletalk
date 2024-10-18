import { DBUserData, Sessions } from "@repo/types";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.unitSuccessDescribe("addSession", "service"), () => {
	it(
		messageCreators.unitSuccessTest(
			"addSession",
			"service",
			"should add new session"
		),
		async () => {
			const { user: currentUser, sessionId } = await randomizer.serviceUser();

			const length = 10;

			const addingSessions: Sessions = [
				{
					sessionId,
				},
			];

			for (let i = 0; i < length; i++) {
				const randomSessionId = randomizer.sessionId();

				await services.user.addSession({
					currentUserId: currentUser.userId,
					sessionId: randomSessionId,
				});

				addingSessions.push({
					sessionId: randomSessionId,
				});

				const { sessions: currentSessions } = (await services.user.findByUserId(
					{
						targetUserId: currentUser.userId,
					}
				)) as DBUserData;

				assertion().sessions({
					test: currentSessions,
					equal: addingSessions,
				});
			}
		}
	);
});

await utils.generateServiceFailTest("addSession", "CURRENT_USER_NOT_EXIST", {
	currentUserId: randomizer.userId(),
	sessionId: randomizer.sessionId(),
});
