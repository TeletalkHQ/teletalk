import { initialState } from "./initialState";
import { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	updateSelectedCountry(selectedCountry) {
		set({ selectedCountry });
	},

	reset() {
		set(initialState);
	},
});
