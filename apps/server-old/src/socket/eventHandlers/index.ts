import { socketEvents } from "@repo/schema";
import { EventShortName } from "@repo/schema";
import { SocketOnHandler } from "@repo/socket";
import { Socket } from "socket.io";

import { authHandlers } from "./auth";
import { otherHandlers } from "./other";
import { privateChatHandlers } from "./privateChat";
import { userHandlers } from "./user";

const handlers = {
	...authHandlers,
	...otherHandlers,
	...userHandlers,
	...privateChatHandlers,
	// FIXME: Fix the rule
	// eslint-disable-next-line no-use-before-define
} satisfies { [K in EventShortName]: SocketOnHandler<K> };

export const events = socketEvents.map((item) => ({
	...item.schema,
	handler: handlers[item.schema.name],
}));

export const registerEvents = (socket: Socket) => {
	events.forEach((item) => {
		if (item.method === "on") socket.customOn(item.name, item.handler);
	});
};

export const eventsWithoutAuth = events.filter(
	(i) => i.isAuthRequired === false
);

export const eventsWithoutAuthAndDisconnect = eventsWithoutAuth.filter(
	(i) => i.name !== "disconnect"
);

export const eventsWithAuth = events.filter((i) => i.isAuthRequired === true);
