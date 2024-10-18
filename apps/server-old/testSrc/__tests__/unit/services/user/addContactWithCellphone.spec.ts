import { extractor } from "@repo/classes";
import { ContactItemWithoutUserId } from "@repo/types";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.unitSuccessDescribe("addContact", "service"), () => {
	it(
		messageCreators.unitSuccessTest(
			"addContact",
			"service",
			"should add new contact with cellphone"
		),
		async () => {
			const { sessionId } = await randomizer.serviceUser();

			const addingContacts: ContactItemWithoutUserId[] = [];

			const length = 10;
			const users = await Promise.all(randomizer.serviceBatchUsers(length));

			for (const { user: targetUser } of users) {
				const item: ContactItemWithoutUserId = {
					...extractor.cellphone(targetUser),
					...randomizer.fullName(),
				};

				addingContacts.push(item);

				await services.user.addContact({
					addingContact: item,
					currentSessionId: sessionId,
					targetUserCellphone: item,
				});

				const { contacts } = await services.user.getContacts({
					currentSessionId: sessionId,
				});

				assertion().contactsWithCellphone({
					test: contacts,
					equal: addingContacts,
				});
			}
		}
	);
});

await utils.generateServiceFailTest("addContact", "CURRENT_USER_NOT_EXIST", {
	currentSessionId: randomizer.sessionId(),
	addingContact: randomizer.contactWithCellphone(),
	targetUserCellphone: randomizer.contactWithCellphone(),
});

await utils.generateServiceFailTest(
	"addContact",
	"TARGET_USER_NOT_EXIST",
	async () => {
		const { sessionId } = await randomizer.serviceUser();

		return {
			currentSessionId: sessionId,
			addingContact: randomizer.contactWithCellphone(),
			targetUserCellphone: randomizer.contactWithCellphone(),
		};
	}
);

await utils.generateServiceFailTest(
	"addContact",
	"CONTACT_ITEM_EXIST",
	async () => {
		const { sessionId } = await randomizer.serviceUser();
		const { user: targetUser } = await randomizer.serviceUser();

		const targetContact: ContactItemWithoutUserId = {
			...extractor.cellphone(targetUser),
			...randomizer.fullName(),
		};

		await services.user.addContact({
			currentSessionId: sessionId,
			addingContact: targetContact,
			targetUserCellphone: targetContact,
		});

		return {
			currentSessionId: sessionId,
			addingContact: targetContact,
			targetUserCellphone: targetContact,
		};
	}
);
