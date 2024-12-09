import { assertion, extractor } from "@repo/classes";
import { type BaseSchema } from "@repo/schema";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

// TODO: Add more tests
describe(messageCreators.e2eSuccessSuite("addContact", "event"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"addContact",
			"event",
			"should add users to contacts"
		),
		async () => {
			const { socket } = await randomizer.userByE2E();
			const { userInfo: targetUserInfo } = await randomizer.userByE2E();

			const dataToSend: BaseSchema.ContactsItem = {
				...extractor.cellphone(targetUserInfo),
				...randomizer.fullName(),
				userId: targetUserInfo.userId,
			};

			const {
				data: { newContact },
			} = await eventHandlerCollection.addContact(socket).send({
				data: dataToSend,
			});

			assertion().oneContact({
				test: newContact,
				equal: dataToSend,
			});
		}
	);
});
