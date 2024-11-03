import { createStore } from "@repo/store";

import { handlers } from "./handlers";
import { initialState } from "./initialState";
import type * as SocketStore from "./types";

export const useSocketStore = createStore<SocketStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { SocketStore };
