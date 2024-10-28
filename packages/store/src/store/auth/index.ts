import { createStore } from "../../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";
import type * as AuthStore from "./types";

export const useAuthStore = createStore<AuthStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { AuthStore };
