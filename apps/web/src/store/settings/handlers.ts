import { initialState } from "./initialState";
import { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	updateProfile(profile) {
		set((prevState) => ({
			profile: {
				...prevState.profile,
				...profile,
			},
		}));
	},

	reset() {
		set(initialState);
	},
});
