import { EventName } from "@repo/schema";
import { SocketResponse } from "@repo/types";

import { websocket } from "~/classes/websocket/Websocket";
import "~/types";

export const useListener = <EvName extends EventName>({
	evName,
	cb,
}: {
	evName: EvName;
	cb: (response: SocketResponse<EvName>) => void;
}) => {
	websocket.client.off(evName);
	websocket.client.on<EventName>(evName, cb);
};
