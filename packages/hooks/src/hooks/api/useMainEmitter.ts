import {
	type EventSchema,
	type GetOutput,
	type IOName,
	type _SocketResponse,
} from "@repo/schema";
import { useEmitter } from "@repo/socket";

import { useConfigs } from "../utils/useConfigs";

export type UseMainEmitterParameters<T extends EventSchema> = {
	schema: T;
	initialData: _SocketResponse<T["io"]>;
	name: IOName;
};

export const useMainEmitter = <T extends EventSchema>({
	schema,
	initialData,
	name,
}: UseMainEmitterParameters<T>) => {
	const { getApiWSBaseUrl } = useConfigs();

	if (!schema) throw new Error("EVENT_NOT_FOUND");

	return useEmitter<string, T["io"]["input"], T["io"]["output"]>({
		baseUrl: getApiWSBaseUrl(),
		eventName: name,
		io: schema.io,
		namespace: schema.namespace,
		options: {
			autoConnect: true,
			withCredentials: true,
		},
		initialData,
	});
};

export const createEmitterInitialData = <T extends EventSchema>(
	_name: T,
	data: GetOutput<T["io"]>
): _SocketResponse<T["io"]> => {
	return {
		data,
		errors: [],
		ok: false,
	};
};
