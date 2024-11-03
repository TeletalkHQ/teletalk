import { BaseArg } from "./types";
import { useInitSocket } from "./useInitSocket";

export const useSocket = ({ baseUrl, namespace, options = {} }: BaseArg) => {
	const { findSocket } = useInitSocket({ baseUrl, namespace, options });

	return {
		socket: findSocket()?.socket,
	};
};
