import { createStore } from "@repo/store";

import { handlers } from "./handlers";
import { initialState } from "./initialState";
import type * as ChatStore from "./types";

export const useChatStore = createStore<ChatStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { type ChatStore };
