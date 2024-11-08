import { DBUserData, FullNameWithUserId } from "@repo/types";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	messageCreators.unitSuccessDescribe("removeContact", "service"),
	() => {
		it(
			messageCreators.unitSuccessTest(
				"removeContact",
				"service",
				"should remove contact with specified userId"
			),
			async () => {
				const { user: currentUser, sessionId } = await randomizer.serviceUser();

				const removingContacts: FullNameWithUserId[] = [];

				const length = 10;
				const users = await Promise.all(randomizer.serviceBatchUsers(length));

				for (const { user: targetUser } of users) {
					const addingContact = {
						...randomizer.fullName(),
						userId: targetUser.userId,
					};

					await services.user.addContact({
						currentSessionId: sessionId,
						fullName: addingContact,
						targetUserId: addingContact.userId,
					});

					removingContacts.push(addingContact);
				}

				for (const { user: targetUser } of [...users]) {
					await services.user.removeContact({
						targetUserId: targetUser.userId,
						currentSessionId: sessionId,
					});

					removingContacts.shift();

					const { contacts } = (await services.user.findByUserId({
						targetUserId: currentUser.userId,
					})) as DBUserData;

					assertion().contactsWithUserId({
						test: contacts,
						equal: removingContacts,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest("removeContact", "CURRENT_USER_NOT_EXIST", {
	currentSessionId: randomizer.sessionId(),
	targetUserId: randomizer.userId(),
});

await utils.generateServiceFailTest(
	"removeContact",
	"CONTACT_ITEM_NOT_EXIST",
	async () => {
		const { sessionId } = await randomizer.serviceUser();

		return {
			currentSessionId: sessionId,
			targetUserId: randomizer.userId(),
		};
	}
);
