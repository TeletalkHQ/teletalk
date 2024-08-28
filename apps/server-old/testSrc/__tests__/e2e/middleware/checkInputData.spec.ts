import { EventName } from "@repo/schema";

import { eventsWithoutDisconnect } from "@/socket/events";
import { utils } from "@/utils";

await utils.asyncDescribe(
	utils.createTestMessage.unitFailDescribe("checkInputData", "middleware"),
	async () => {
		const eventsWithInputFields = eventsWithoutDisconnect.filter(
			(i) => Object.keys(i.inputValidator || {}).length
		);

		const eventsWithInputFieldsExceptAuth = eventsWithInputFields.filter(
			(i) =>
				!(["signIn", "verify", "createNewUser"] as EventName[]).includes(i.name)
		);

		return () => {
			for (const _event of eventsWithInputFieldsExceptAuth) {
				// const title = utils.createTestMessage.unitFailTest(
				// 	event.name,
				// 	"middleware",
				// 	"INPUT_FIELDS_MISSING"
				// );

				it("//TODO: title", async () => {
					// await requesterMaker(socket, event as any)
					// 	.setError("INPUT_FIELDS_MISSING")
					// 	.setOptions({ shouldFilterRequestData: false })
					// 	.emitFull();
				});
			}

			for (const _event of eventsWithoutDisconnect) {
				// const title = utils.createTestMessage.unitFailTest(
				// 	event.name,
				// 	"middleware",
				// 	"INPUT_FIELDS_OVERLOAD"
				// );

				it("//TODO: title", async () => {
					// await requesterMaker(socket, event as any)
					// 	.setError("INPUT_FIELDS_OVERLOAD")
					// 	.setOptions({
					// 		shouldFilterRequestData: false,
					// 	})
					// 	.emitFull({
					// 		...utils.generateDynamicData(event.inputFields),
					// 		[randomMaker.string(10)]: randomMaker.string(10),
					// 	});
				});
			}
		};
	}
);
