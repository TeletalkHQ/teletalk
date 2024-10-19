import { SocketEventBuilder } from "~/classes/SocketEventBuilder";
import {
	eventsWithAuth,
	eventsWithoutAuth,
	events as mainEvents,
} from "~/socket/eventHandlers";

export const events = [...mainEvents];

export const unknownEvent = SocketEventBuilder()
	.create()
	//@ts-expect-error //FIXME
	.name("unknownEvent")
	.handler(() => ({ data: {} }))
	.inputSchema({
		type: "object",
	})
	.outputSchema({
		type: "object",
	})
	.build();

export const eventsWithoutDisconnect = events.filter(
	(i) => i.name !== "disconnect"
);

export { eventsWithAuth, eventsWithoutAuth };
