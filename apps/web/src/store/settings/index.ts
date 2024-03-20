import { SettingsStore } from "~/types";

import { create } from "../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useSettingsStore = create<SettingsStore>((set) => ({
  ...initialState,
  ...handlers(set),
}));
