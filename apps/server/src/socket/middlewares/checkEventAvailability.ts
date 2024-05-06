import { errorStore } from "@repo/error-store";
import { SocketMiddleware } from "@repo/hl-types";

import { events } from "~/socket/events";

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
