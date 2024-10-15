import { findHttpRoute } from "@repo/schema";

import { appInitializer } from "~/modules/app/app.module";

import { randomizer } from "@/classes";
import { httpHandler } from "@/classes/HTTPHandler";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("signIn", "httpRoute"), () => {
	beforeEach(async () => {
		await appInitializer();
	});

	it(
		messageCreators.e2eSuccessTest(
			"signIn",
			"httpRoute",
			"should sign as new user"
		),
		async () => {
			const handler = httpHandler(findHttpRoute("signIn").schema);
			await handler.send(randomizer.unusedCellphone());
		}
	);
});
