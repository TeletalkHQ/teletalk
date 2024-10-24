import { createStore } from "../../utils";
import { handlers } from "./handlers";
import { defaultDialogProps, dialogNames, initialState } from "./initialState";
import * as DialogStore from "./types";

export const useDialogStore = createStore<DialogStore.Store>((set) => ({
	...initialState,
	...handlers(set),
}));

export { DialogStore, defaultDialogProps, dialogNames };
