import { EventName, GetOutput, _SocketResponse, findEvent } from "@repo/schema";
import { useEmitter } from "@repo/socket";

import { useConfigs } from "../utils";

export type UseMainEmitterParameters<T extends EventName> = {
	name: T;
	initialData: _SocketResponse<T>;
};

export const useMainEmitter = <T extends EventName>({
	name,
	initialData,
}: UseMainEmitterParameters<T>) => {
	const { getApiWSBaseUrl } = useConfigs();

	const event = findEvent(name);

	type Event = typeof event;

	if (!event) throw new Error("EVENT_NOT_FOUND");

	return useEmitter<
		T,
		Event["schema"]["io"]["input"],
		Event["schema"]["io"]["output"]
	>({
		baseUrl: getApiWSBaseUrl(),
		eventName: name,
		io: event.schema.io,
		namespace: event.schema.namespace,
		options: {
			autoConnect: true,
			withCredentials: true,
		},
		initialData,
	});
};

export const createEmitterInitialData = <T extends EventName>(
	_name: T,
	data: GetOutput<T>
): _SocketResponse<T> => {
	return {
		data,
		errors: [],
		ok: false,
	};
};
