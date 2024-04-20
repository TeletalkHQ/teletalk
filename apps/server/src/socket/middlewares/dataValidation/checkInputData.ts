import { events } from "~/socket/events";
import { SocketMiddleware } from "~/types";

export const checkInputData: SocketMiddleware = async (
	_socket,
	next,
	[name, data]
) => {
	const foundEvent = events.find((item) => item.name === name);

	if (foundEvent?.inputValidator) await foundEvent.inputValidator(data);
	next();
};
