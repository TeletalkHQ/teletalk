import { extractor } from "@repo/classes";
import { assertion } from "@repo/classes";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("removeContact", "event"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"removeContact",
			"event",
			"should remove users from contacts"
		),
		async () => {
			const { socket } = await randomizer.userByE2E();
			const { userInfo: targetUserInfo } = await randomizer.userByE2E();

			const contactToAdd = extractor.contact(targetUserInfo);

			await eventHandlerCollection.addContact(socket).send({
				data: contactToAdd,
			});

			const {
				data: { removedContact },
			} = await eventHandlerCollection.removeContact(socket).send({
				data: {
					userId: contactToAdd.userId,
				},
			});

			assertion().userId({
				equal: contactToAdd.userId,
				test: removedContact.userId,
			});
		}
	);
});
