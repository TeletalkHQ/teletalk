import chai from "chai";

import { authHelper } from "@/classes/AuthHelper";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.e2eSuccessSuite("verify", "httpRoute"), () => {
	it(
		messageCreators.e2eSuccessTest(
			"verify",
			"httpRoute",
			"should sign and verify as new user"
		),
		async () => {
			const cellphone = randomizer.unusedCellphone();
			const fullName = randomizer.fullName();

			const helper = authHelper(cellphone, fullName);
			await helper.signIn();
			await helper.verify();
			chai.expect(helper.getResponses().verify.data.newUser).to.be.equal(true);
		}
	);

	it(
		messageCreators.e2eSuccessTest(
			"verify",
			"httpRoute",
			"should verify as existing user"
		),
		async () => {
			const cellphone = randomizer.unusedCellphone();
			const fullName = randomizer.fullName();
			await authHelper(cellphone, fullName).createComplete();

			const helper = authHelper(cellphone, fullName);
			await helper.signIn();
			await helper.verify();
			chai.expect(helper.getResponses().verify.data.newUser).to.be.equal(false);
		}
	);
});
