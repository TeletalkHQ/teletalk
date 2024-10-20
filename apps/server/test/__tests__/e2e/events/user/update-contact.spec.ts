import { extractor } from "@repo/classes";
import { assertion } from "@repo/classes";
import { BaseSchema } from "@repo/schema";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("updateContact", "event"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"updateContact",
			"event",
			"should edit users in contacts"
		),
		async () => {
			const { socket } = await randomizer.userByE2E();
			const { userInfo: targetUserInfo } = await randomizer.userByE2E();

			const contactToAdd = extractor.contact(targetUserInfo);

			await eventHandlerCollection
				.addContact(socket)
				.send({ data: contactToAdd });

			const contactToEdit: BaseSchema.ContactsItem = {
				...randomizer.fullName(),
				userId: contactToAdd.userId,
			};

			const {
				data: { updatedContact },
			} = await eventHandlerCollection.updateContact(socket).send({
				data: contactToEdit,
			});

			assertion().oneContact({
				test: updatedContact,
				equal: contactToEdit,
			});
		}
	);
});
