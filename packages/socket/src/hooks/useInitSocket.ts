import { useCallback, useLayoutEffect } from "react";
import { io } from "socket.io-client";

import { useSocketStore } from "../store/socket";
import { BaseArg } from "./types";

export const useInitSocket = ({
	baseUrl,
	namespace,
	options = {},
}: BaseArg) => {
	const socketStore = useSocketStore();

	const findSocket = useCallback(
		() =>
			socketStore.socketCollection.find(
				(item) => item.baseUrl === baseUrl && item.namespace === namespace
			),
		[baseUrl, namespace, socketStore.socketCollection]
	);

	useLayoutEffect(() => {
		if (!findSocket()) {
			console.log("options:", options);

			const socket = io(baseUrl, options);
			socketStore.addSocket({
				baseUrl,
				namespace,
				options,
				socket,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [baseUrl, findSocket, namespace, options]);

	return {
		findSocket,
	};
};
