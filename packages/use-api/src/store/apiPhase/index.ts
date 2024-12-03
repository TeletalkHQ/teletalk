import { createStore } from "@repo/store";

import { handlers } from "./handlers";
import { initialState } from "./initialState";
import * as ApiPhaseStore from "./types";

export const useApiPhaseStore = createStore<ApiPhaseStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export * from "./initialState";

export { ApiPhaseStore };
