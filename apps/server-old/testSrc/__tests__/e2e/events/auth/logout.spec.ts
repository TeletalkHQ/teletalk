import { authHelper } from "@/classes/AuthHelper";
import { randomizer } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(messageCreators.e2eSuccessSuite("logout", "httpRoute"), () => {
	it(
		messageCreators.e2eSuccessTest("logout", "event", "should logout user"),
		async () => {
			const cellphone = randomizer.unusedCellphone();
			const fullName = randomizer.fullName();
			const ah = authHelper(cellphone, fullName);

			await ah.createComplete();

			await httpHandlerCollection.logout(ah.getClientSocket()).send(undefined);
		}
	);
});
