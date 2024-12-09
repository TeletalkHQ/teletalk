import { createStore } from "@repo/store";

import { handlers } from "./handlers";
import { initialState } from "./initialState";
import type * as GlobalStore from "./types";

export const useGlobalStore = createStore<GlobalStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { type GlobalStore };
