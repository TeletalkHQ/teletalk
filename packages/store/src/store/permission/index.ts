import { createStore } from "../../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";
import * as PermissionStore from "./types";

export const usePermissionStore = createStore<PermissionStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { PermissionStore };
