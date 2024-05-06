import { stuffStore } from "~/classes/StuffStore";
import { EventHandler, eventHandler } from "~/classes/websocket/EventHandler";
import { EventName, SocketRoute } from "~/types";

type Events = {
	//TODO: Remove any
	[key in EventName]: EventHandler<any>;
};

export class SocketEmitterStore {
	events = stuffStore.events.reduce((prevValue, currValue) => {
		const c = currValue as SocketRoute;
		prevValue[c.name] = eventHandler(
			() => undefined,
			() => undefined
		).setRoute(c);
		return prevValue;
	}, {} as Events);
}

export const socketEmitterStore = () => new SocketEmitterStore();
