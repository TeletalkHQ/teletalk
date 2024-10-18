import { extractor } from "@repo/classes";

import { authHelper } from "@/classes/AuthHelper";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.e2eSuccessSuite("signIn", "httpRoute"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"signIn",
			"httpRoute",
			"should sign as new user"
		),
		async () => {
			const cellphone = randomizer.unusedCellphone();
			const helper = authHelper(cellphone);

			await helper.signIn();
		}
	);

	it(
		messageCreators.e2eSuccessTest(
			"signIn",
			"httpRoute",
			"should sign as existed user"
		),
		async () => {
			const { user } = await randomizer.userByE2E();
			const cellphone = extractor.cellphone(user);
			const helper = authHelper(cellphone);

			await helper.signIn();
		}
	);
});
