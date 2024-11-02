import { createStore } from "../../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";
import * as ServerStore from "./types";

export const useServerStore = createStore<ServerStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { ServerStore };
