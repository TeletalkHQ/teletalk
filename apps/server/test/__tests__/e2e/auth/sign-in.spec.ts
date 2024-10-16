import { randomizer } from "@/classes";
import { httpHandlerCollection } from "@/utils/httpHandlerCollection";
import { testAppInitializer } from "@/utils/testAppInitializer";
import { messageCreators } from "@/utils/testMessageCreators";

describe(messageCreators.e2eSuccessSuite("signIn", "httpRoute"), () => {
	before(async () => {
		await testAppInitializer();
	});

	it(
		messageCreators.e2eSuccessTest(
			"signIn",
			"httpRoute",
			"should sign as new user"
		),
		async () => {
			const handler = httpHandlerCollection.signIn();
			await handler.send(randomizer.unusedCellphone());
		}
	);

	it(
		messageCreators.e2eSuccessTest(
			"verify",
			"httpRoute",
			"should get verified as new user"
		),
		async () => {
			const handler = httpHandlerCollection.signIn();
			await handler.send(randomizer.unusedCellphone());
			const handler2 = httpHandlerCollection.verify({
				session: handler.getSessionCookie().value,
			});

			await handler2.send({
				signInCode: "123123",
			});
		}
	);
});
