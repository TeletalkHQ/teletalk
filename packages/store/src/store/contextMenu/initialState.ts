import type { State } from "./types";

export const initialState: State = {
	contextMenu: {
		list: [],
		position: {
			mouseX: 0,
			mouseY: 0,
		},
	},
};
