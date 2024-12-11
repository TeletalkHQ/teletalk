import { randomizer } from "@/classes";
import { authHelper } from "@/classes";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("createUser", "httpRoute"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"createUser",
			"httpRoute",
			"should be able to create new user"
		),
		async () => {
			const cellphone = randomizer.unusedCellphone();
			const fullName = randomizer.fullName();

			const helper = authHelper(cellphone, fullName);

			await helper.createComplete();
		}
	);
});
