import { createStore } from "../../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";
import * as ContextMenuStore from "./types";

export const useContextMenuStore = createStore<ContextMenuStore.Store>(
	(set) => ({
		...initialState,
		...handlers(set),
	})
);

export { ContextMenuStore };
