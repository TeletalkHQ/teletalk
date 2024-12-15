import { initialState } from "./initialState";
import type { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	updateIsDrawerOpen(open) {
		set((prevState) => {
			return {
				drawer: {
					...prevState.drawer,
					open,
				},
			};
		});
	},

	updateIsInitialized(isInitialized) {
		set({
			isInitialized,
		});
	},

	updateOnlineStatus(isOnline) {
		set({
			isOnline,
		});
	},

	reset() {
		set(initialState);
	},
});
