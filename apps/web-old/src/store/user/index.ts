import { create } from "../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";
import type * as UserStore from "./types";

export const useUserStore = create<UserStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { UserStore };
