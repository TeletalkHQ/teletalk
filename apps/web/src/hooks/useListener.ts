import type { IOCollection } from "@repo/type-store";

import { websocket } from "~/classes/websocket/Websocket";
import { EventName, SocketResponse } from "~/types";

export const useListener = <EvName extends EventName>({
	evName,
	cb,
}: {
	evName: EvName;
	//@ts-expect-error //FIXME
	cb: (response: SocketResponse<IOCollection[EvName]["output"]>) => void;
}) => {
	websocket.client.off(evName);
	websocket.client.on<EventName>(evName, cb);
};
