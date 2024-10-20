import { assertion, extractor } from "@repo/classes";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

// TODO: Stress test
describe(messageCreators.e2eSuccessSuite("getContacts", "event"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"getContacts",
			"event",
			"should get contacts"
		),
		async () => {
			const { socket } = await randomizer.userByE2E();

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

			assertion().contacts({
				test: contacts,
				equal: [addingContact],
			});
		}
	);
});
