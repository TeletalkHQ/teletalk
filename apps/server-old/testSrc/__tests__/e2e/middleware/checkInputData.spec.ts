import { EventName } from "@repo/schema";

import { eventsWithoutDisconnect } from "@/socket/events";
import { utils } from "@/utils";

await utils.asyncDescribe(
	messageCreators.unitFailDescribe("checkInputData", "middleware"),
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
				// const title = messageCreators.unitFailTest(
				// 	event.name,
				// 	"middleware",
				// 	"INPUT_FIELDS_MISSING"
				// );

				it("//TODO: title", async () => {
					// await requesterMaker(socket, event as any)
					// 	.setError("INPUT_FIELDS_MISSING")
					// 	.setOptions({ shouldFilterRequestData: false })
					// 	.send();
				});
			}

			for (const _event of eventsWithoutDisconnect) {
				// const title = messageCreators.unitFailTest(
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
					// 	.send({
					// 		...utils.generateDynamicData(event.inputFields),
					// 		[randomizer.string(10)]: randomizer.string(10),
					// 	});
				});
			}
		};
	}
);
