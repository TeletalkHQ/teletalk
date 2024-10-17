import { expect } from "chai";

import { randomizer } from "@/classes";
import { authHelper } from "@/classes/AuthHelper";
import { messageCreators } from "@/utils/testMessageCreators";

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

			const ah = authHelper(cellphone, fullName);
			await ah.signIn();
			await ah.verify();

			expect(ah.getResponses().verify.data.data.isNewUser).to.be.equal(true);
		}
	);

	it(
		messageCreators.e2eSuccessTest(
			"verify",
			"httpRoute",
			"should get verified as existing user"
		),
		async () => {
			const cellphone = randomizer.unusedCellphone();
			const fullName = randomizer.fullName();

			await authHelper(cellphone, fullName).createComplete();

			const ah = authHelper(cellphone, fullName);
			await ah.signIn();
			await ah.verify();

			expect(ah.getResponses().verify.data.data.isNewUser).to.be.equal(false);
		}
	);
});
