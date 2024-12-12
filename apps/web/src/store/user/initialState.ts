import { type State } from "./types";

export const initialState: State = {
	selectedUUID: {
		to: {
			block: undefined,
			chat: undefined,
			editContact: undefined,
			removeContact: undefined,
			unblock: undefined,
		},
	},
};
