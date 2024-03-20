import { MessageStore } from "~/types";

import { create } from "../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";

export const useMessageStore = create<MessageStore>((set) => ({
  ...initialState,
  ...handlers(set),
}));
