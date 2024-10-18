import { authHelper } from "@/classes/AuthHelper";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.e2eSuccessSuite("createNewUser", "httpRoute"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"createNewUser",
			"httpRoute",
			"should create new user"
		),
		async () => {
			const cellphone = randomizer.unusedCellphone();
			const fullName = randomizer.fullName();

			const helper = authHelper(cellphone, fullName);

			await helper.createComplete();
		}
	);
});
