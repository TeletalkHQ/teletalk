import { StoreSetFn, VoidWithArg } from "@repo/types";
import {
	ManagerOptions,
	Socket,
	SocketOptions as SocketOptions_pkg,
} from "socket.io-client";

export type SocketOptions = Partial<ManagerOptions & SocketOptions_pkg>;

interface SocketItem {
	baseUrl: string;
	namespace: string;
	options: SocketOptions;
	socket: Socket;
}

type SocketCollection = Array<SocketItem>;

export interface State {
	socketCollection: SocketCollection;
}

export interface Handlers {
	addSocket: VoidWithArg<SocketItem>;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
