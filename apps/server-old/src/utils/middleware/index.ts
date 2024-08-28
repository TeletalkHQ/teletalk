import { EventName } from "@repo/schema";
import { SocketMiddleware } from "@repo/socket";

import { utils } from "~/utils";

const applyMiddlewares = <T extends EventName = any>(
	eventNamesToApply: EventName | EventName[],
	...middlewares: SocketMiddleware<T>[]
) => {
	return (async (socket, next, socketMiddlewareEvent) => {
		if (utils.isEventNameMatch(eventNamesToApply, socketMiddlewareEvent[0]))
			await utils.executeMiddlewares({
				middlewares,
				next,
				socket,
				socketMiddlewareEvent,
			});
		else next();
	}) as SocketMiddleware<T>;
};

const ignoreMiddlewares = <T extends EventName = any>(
	eventNamesToIgnore: EventName | EventName[],
	...middlewares: SocketMiddleware<T>[]
) => {
	return (async (socket, next, socketMiddlewareEvent) => {
		if (utils.isEventNameMatch(eventNamesToIgnore, socketMiddlewareEvent[0]))
			next();
		else
			await utils.executeMiddlewares({
				middlewares,
				next,
				socket,
				socketMiddlewareEvent,
			});
	}) as SocketMiddleware<T>;
};

export const middlewareUtils = {
	applyMiddlewares,
	ignoreMiddlewares,
};
