import { SocketMiddleware } from "@repo/hl-types";

import { events } from "~/socket/events";

export const checkInputData: SocketMiddleware<any> = async (
	_socket,
	next,
	[name, data]
) => {
	const foundEvent = events.find((item) => item.name === name);

	if (foundEvent?.inputValidator) await foundEvent.inputValidator(data);
	next();
};
