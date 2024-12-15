import type { State } from "./types";

export const initialState: State = {
	menu: {
		list: [],
		position: {
			mouseX: 0,
			mouseY: 0,
		},
	},
};
