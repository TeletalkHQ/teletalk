import { SocketOnAnyHandler } from "@repo/hl-types";

//CLEANME:
export const logEvent: SocketOnAnyHandler<any> = async (
	_socket,
	data,
	eventName
) => {
	logger.info(`socket.eventName:${eventName}`);
	if (data) {
		logger.info("data:");
		logger.info(data);
	}
};
