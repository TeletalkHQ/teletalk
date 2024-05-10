import { StringMap } from "@repo/type-store";

import { websocket } from "~/classes/websocket/Websocket";

export const otherEvents = () => {
	websocket.client.onAny((event, ...args) => {
		console.debug(`socket event:${event}`, ...args);
	});

	window.ping = (data: StringMap) =>
		websocket.client.emit("ping", data, (response: any) =>
			console.log(response)
		);

	websocket.client.on("pong", (...args) => console.debug(...args));
};
