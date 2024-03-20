import { stuffStore } from "~/classes/StuffStore";
import { EventHandler, eventHandler } from "~/classes/websocket/EventHandler";
import { EventName, IO, SocketRoute } from "~/types";

type Events = {
  [key in EventName]: EventHandler<IO>;
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
