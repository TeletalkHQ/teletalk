import { randomizer } from "@/classes";
import { authHelper } from "@/classes/AuthHelper";
import { httpHandlerCollection } from "@/utils/httpHandlerCollection";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("logout", "httpRoute"), () => {
	it(
		messageCreators.e2eSuccessTest("logout", "httpRoute", "should logout user"),
		async () => {
			const cellphone = randomizer.unusedCellphone();
			const fullName = randomizer.fullName();
			const ah = authHelper(cellphone, fullName);
			await ah.createComplete();
			await httpHandlerCollection
				.logout({
					session: ah.getSession(),
				})
				.send(undefined);
		}
	);
});
