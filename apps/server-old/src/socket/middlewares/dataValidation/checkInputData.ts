import { SocketMiddleware } from "@repo/socket";

import { events } from "~/socket/eventHandlers";

export const checkInputData: SocketMiddleware<any> = async (
	_socket,
	next,
	[name, data]
) => {
	const foundEvent = events.find((item) => item.name === name);

	if (foundEvent?.inputValidator) await foundEvent.inputValidator(data);
	next();
};
