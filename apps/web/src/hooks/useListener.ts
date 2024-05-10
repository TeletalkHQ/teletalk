import { SocketResponse } from "@repo/hl-types";
import { EventName } from "@repo/type-store";

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
