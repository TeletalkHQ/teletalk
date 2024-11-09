import { createStore } from "@repo/store";

import { handlers } from "./handlers";
import { initialState } from "./initialState";
import type * as UserStore from "./types";

export const useUserStore = createStore<UserStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { UserStore };
