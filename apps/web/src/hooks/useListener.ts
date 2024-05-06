import { SocketResponse } from "@repo/hl-types";

import { websocket } from "~/classes/websocket/Websocket";
import { EventName } from "~/types";

export const useListener = <EvName extends EventName>({
	evName,
	cb,
}: {
	evName: EvName;
	//@ts-expect-error //FIXME
	cb: (response: SocketResponse<EvName>) => void;
}) => {
	websocket.client.off(evName);
	websocket.client.on<EventName>(evName, cb);
};
