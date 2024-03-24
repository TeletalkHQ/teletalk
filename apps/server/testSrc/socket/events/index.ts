import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import {
	eventsWithAuth,
	eventsWithoutAuth,
	events as mainEvents,
} from "~/socket/events";

export const events = [...mainEvents];

export const unknownEvent = socketEventBuilder()
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
