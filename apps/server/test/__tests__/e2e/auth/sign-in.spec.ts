import { SessionService } from "~/modules/session/session.service";
import { TempSessionStoreService } from "~/modules/temp-session-store/temp-session-store.service";

import { randomizer } from "@/classes";
import { getServiceInstance } from "@/utils/app";
import { httpHandlerCollection } from "@/utils/httpHandlerCollection";
import { testAppInitializer } from "@/utils/testAppInitializer";
import { messageCreators } from "@/utils/testMessageCreators";

const sessionService = await getServiceInstance(SessionService);
const tempSessionStoreService = await getServiceInstance(
	TempSessionStoreService
);

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

			await randomizer.userByE2E();

			const verifiedSession = await sessionService.verify(
				handler.getSessionCookie().value
			);

			const sessionId = sessionService.getSessionId(verifiedSession!);

			const storedSession = await tempSessionStoreService.find(sessionId);

			if (!storedSession) throw new Error("STORED_SESSION_NOT_FOUND");

			await handler2.send({
				signInCode: storedSession.signInCode,
			});
		}
	);
});
