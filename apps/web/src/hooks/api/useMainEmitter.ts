import { useConfigs } from "@repo/hooks";
import { EventName, findEvent } from "@repo/schema";
import { useEmitter } from "@repo/socket";

export const useMainEmitter = <T extends EventName>({ name }: { name: T }) => {
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
	});
};
