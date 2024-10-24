import { create } from "../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";
import type * as GlobalStore from "./types";

export const useGlobalStore = create<GlobalStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { GlobalStore };
