import { extractor } from "@repo/classes";
import { ContactItem } from "@repo/types";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.unitSuccessDescribe("getContacts", "service"), () => {
	it(messageCreators.unitSuccessTest("getContacts", "service"), async () => {
		const { sessionId } = await randomizer.serviceUser();

		const addingContacts: ContactItem[] = [];

		const length = 10;
		const users = await Promise.all(randomizer.serviceBatchUsers(length));

		for (const { user: targetUser } of users) {
			const item: ContactItem = {
				...extractor.cellphone(targetUser),
				...randomizer.fullName(),
				userId: targetUser.userId,
			};

			await services.user.addContact({
				addingContact: item,
				currentSessionId: sessionId,
				targetUserCellphone: extractor.cellphone(item),
			});

			addingContacts.push(item);

			const { contacts: contactsFromService } = await services.user.getContacts(
				{
					currentSessionId: sessionId,
				}
			);

			assertion().contacts({
				test: contactsFromService,
				equal: addingContacts,
			});
		}
	});
});

await utils.generateServiceFailTest("getContacts", "CURRENT_USER_NOT_EXIST", {
	currentSessionId: randomizer.sessionId(),
});
