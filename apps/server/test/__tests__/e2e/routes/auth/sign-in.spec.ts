import { extractor } from "@repo/classes";

import { authHelper, randomizer } from "@/classes";
import { httpHandlerCollection } from "@/utils/httpHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("signIn", "httpRoute"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"signIn",
			"httpRoute",
			"should sign in as new user"
		),
		async () => {
			const handler = httpHandlerCollection.signIn();
			await handler.send({
				data: randomizer.unusedCellphone(),
			});
		}
	);

	it(
		messageCreators.e2eSuccessTest(
			"signIn",
			"httpRoute",
			"should be able to sign in as existing user"
		),
		async () => {
			const { userInfo } = await randomizer.userByE2E();
			const cellphone = extractor.cellphone(userInfo);
			const helper = authHelper(cellphone);

			await helper.signIn();
		}
	);
});
