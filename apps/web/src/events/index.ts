import { addOnlineStatusEvents } from "~/events/onlineConnectionsChecker";
import { websocketEvents } from "~/events/websocket";

export const events = {
  addOnlineStatusEvents,
  websocket: websocketEvents,
};
