import { UserStore } from "~/types";

import { create } from "../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,
  ...handlers(set),
}));
