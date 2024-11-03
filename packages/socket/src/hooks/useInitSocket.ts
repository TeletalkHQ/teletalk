import { useCallback, useContext, useLayoutEffect } from "react";
import { io } from "socket.io-client";

import { IoContext } from "../providers";
import { SocketItem } from "../providers/io/context";
import { BaseArg } from "./types";

export const useInitSocket = ({
	baseUrl,
	namespace,
	options = {},
}: BaseArg) => {
	const { socketCollection } = useContext(IoContext);

	const findSocket = useCallback(
		() =>
			socketCollection.current.find(
				(item) => item.baseUrl === baseUrl && item.namespace === namespace
			),
		[baseUrl, namespace, socketCollection]
	);

	const addSocket = (item: SocketItem) => {
		socketCollection.current.push(item);
	};

	useLayoutEffect(() => {
		if (!findSocket()) {
			const socket = io(baseUrl, options);
			addSocket({
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
