import { create } from "../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";
import type * as AuthStore from "./types";

export const useAuthStore = create<AuthStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { AuthStore };
