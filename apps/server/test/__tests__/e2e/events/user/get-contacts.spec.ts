import { assertion, extractor } from "@repo/classes";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("getContacts", "event"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"getContacts",
			"event",
			"should get contacts"
		),
		async () => {
			const { socket } = await randomizer.userByE2E();

			// TODO: Stress test

			const { userInfo: targetUserInfo } = await randomizer.userByE2E();
			const addingContact = extractor.contact(targetUserInfo);
			await eventHandlerCollection.addContact(socket).send({
				data: addingContact,
			});

			const {
				data: { contacts },
			} = await eventHandlerCollection.getContacts(socket).send({
				data: {},
			});

			assertion().oneContact({
				test: contacts.at(0)!,
				equal: addingContact,
			});
		}
	);
});
