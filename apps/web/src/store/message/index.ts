import { create } from "../utils";
import { handlers } from "./handlers";
import { initialState } from "./initialState";
import type * as MessageStore from "./types";

export const useMessageStore = create<MessageStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { MessageStore };
