import { GlobalStore } from "~/types";

import { create } from "../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useGlobalStore = create<GlobalStore>((set) => ({
  ...initialState,
  ...handlers(set),
}));
