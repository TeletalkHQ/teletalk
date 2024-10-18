import { extractor } from "@repo/classes";
import { ContactItem } from "@repo/types";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	messageCreators.unitSuccessDescribe("updateContact", "service"),
	() => {
		it(
			messageCreators.unitSuccessTest(
				"updateContact",
				"service",
				"should update contact"
			),
			async () => {
				const { sessionId } = await randomizer.serviceUser();

				const updatingContacts: ContactItem[] = [];

				const length = 10;
				const users = await Promise.all(randomizer.serviceBatchUsers(length));

				for (const { user: targetUser } of users) {
					const { userId: targetUserId, ...addingContact } =
						extractor.contact(targetUser);

					await services.user.addContact({
						addingContact,
						currentSessionId: sessionId,
						targetUserCellphone: addingContact,
					});

					updatingContacts.push({ ...addingContact, userId: targetUserId });
				}

				for (const [index, { user: targetUser }] of users.entries()) {
					const editValues = randomizer.fullName();

					await services.user.updateContact({
						targetUserId: targetUser.userId,
						currentSessionId: sessionId,
						editValues,
					});

					updatingContacts[index] = {
						...extractor.contact(targetUser),
						...editValues,
					};

					const { contacts } = await services.user.getContacts({
						currentSessionId: sessionId,
					});

					assertion().contactsWithUserId({
						test: contacts,
						equal: updatingContacts,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest("updateContact", "CURRENT_USER_NOT_EXIST", {
	currentSessionId: randomizer.sessionId(),
	editValues: randomizer.fullName(),
	targetUserId: randomizer.userId(),
});

await utils.generateServiceFailTest(
	"updateContact",
	"CONTACT_ITEM_NOT_EXIST",
	async () => {
		const { sessionId } = await randomizer.serviceUser();

		return {
			currentSessionId: sessionId,
			editValues: randomizer.fullName(),
			targetUserId: randomizer.userId(),
		};
	}
);
