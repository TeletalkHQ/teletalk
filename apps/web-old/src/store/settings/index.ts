import { create } from "../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";
import type * as SettingsStore from "./types";

export const useSettingsStore = create<SettingsStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { SettingsStore };
