import { AuthStore } from "~/types";

import { create } from "../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  ...handlers(set),
}));
