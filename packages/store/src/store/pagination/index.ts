import { createStore } from "../../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";
import * as PaginationStore from "./types";

export const usePaginationStore = createStore<PaginationStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { PaginationStore };
