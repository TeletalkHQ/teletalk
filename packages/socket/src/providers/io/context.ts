import { createContext } from "react";
import {
	ManagerOptions,
	Socket,
	SocketOptions as SocketOptions_pkg,
} from "socket.io-client";

export type SocketOptions = Partial<ManagerOptions & SocketOptions_pkg>;

export interface SocketItem {
	baseUrl: string;
	namespace: string;
	options: SocketOptions;
	socket: Socket;
}

export type SocketCollection = Array<SocketItem>;

type ContextValue = {
	socketCollection: React.MutableRefObject<SocketCollection>;
};

export const IoContext = createContext<ContextValue>({
	socketCollection: {
		current: [],
	},
});
