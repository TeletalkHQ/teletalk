import { errorStore } from "@repo/error-store";
import { SocketMiddleware } from "@repo/socket";

import { events } from "~/socket/eventHandlers";

export const checkEventAvailability: SocketMiddleware<any> = (
	_socket,
	next,
	[eventName]
) => {
	const foundEvent = events.find((item) => item.name === eventName);

	if (!foundEvent)
		throw {
			...errorStore.find("EVENT_NOT_FOUND"),
			eventName,
		};

	next();
};
