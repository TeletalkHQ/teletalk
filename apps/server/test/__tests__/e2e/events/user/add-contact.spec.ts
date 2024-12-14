import { assertion, extractor } from "@repo/classes";
import { GetInput, IOCollection } from "@repo/schema";

import { randomizer } from "@/classes";
import { eventHandlerCollection } from "@/utils/eventHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

// TODO: Add more tests
describe(messageCreators.e2eSuccessSuite("addContactByPhone", "event"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"addContactByPhone",
			"event",
			"should add users to contacts"
		),
		async () => {
			const { socket } = await randomizer.userByE2E();
			const { userInfo: targetUserInfo } = await randomizer.userByE2E();

			const dataToSend: GetInput<IOCollection["addContactByPhone"]> = {
				...extractor.cellphone(targetUserInfo),
				...randomizer.fullName(),
			};

			const {
				data: { newContact },
			} = await eventHandlerCollection.addContactByPhone(socket).send({
				data: dataToSend,
			});

			assertion().oneContact({
				test: newContact,
				equal: {
					...dataToSend,
					userId: targetUserInfo.userId,
				},
			});
		}
	);
});
