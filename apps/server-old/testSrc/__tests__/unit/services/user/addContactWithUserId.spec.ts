import { FullNameWithUserId } from "@repo/types";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	messageCreators.unitSuccessDescribe("addContactWithUserId", "service"),
	() => {
		it(
			messageCreators.unitSuccessTest(
				"addContactWithUserId",
				"service",
				"should add new contact with target user id"
			),
			async () => {
				const { sessionId } = await randomizer.serviceUser();

				const addingContacts: FullNameWithUserId[] = [];

				const length = 10;
				const users = await Promise.all(randomizer.serviceBatchUsers(length));

				for (const { user: targetUser } of users) {
					const item: FullNameWithUserId = {
						...randomizer.fullName(),
						userId: targetUser.userId,
					};

					addingContacts.push(item);

					await services.user.addContactWithUserId({
						fullName: item,
						currentSessionId: sessionId,
						targetUserId: item.userId,
					});

					const { contacts } = await services.user.getContacts({
						currentSessionId: sessionId,
					});

					assertion().contactsWithUserId({
						test: contacts,
						equal: addingContacts,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest(
	"addContactWithUserId",
	"CONTACT_ITEM_EXIST",
	async () => {
		const { sessionId } = await randomizer.serviceUser();
		const { user: targetUser } = await randomizer.serviceUser();

		const targetContact: FullNameWithUserId = {
			...randomizer.fullName(),
			userId: targetUser.userId,
		};

		await services.user.addContactWithUserId({
			currentSessionId: sessionId,
			fullName: targetContact,
			targetUserId: targetContact.userId,
		});

		return {
			currentSessionId: sessionId,
			fullName: targetContact,
			targetUserId: targetUser.userId,
		};
	}
);

await utils.generateServiceFailTest(
	"addContactWithUserId",
	"CURRENT_USER_NOT_EXIST",
	{
		currentSessionId: randomizer.sessionId(),
		fullName: randomizer.fullName(),
		targetUserId: randomizer.userId(),
	}
);

await utils.generateServiceFailTest(
	"addContactWithUserId",
	"TARGET_USER_NOT_EXIST",
	async () => {
		const { sessionId } = await randomizer.serviceUser();

		return {
			currentSessionId: sessionId,
			fullName: randomizer.fullName(),
			targetUserId: randomizer.userId(),
		};
	}
);
