import { createStore } from "../../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";
import * as LoadingStore from "./types";

export const useLoadingStore = createStore<LoadingStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { initialState, defaultLoadingItem } from "./initialState";

export { LoadingStore };
