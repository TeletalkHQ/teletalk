import { defaultLoadingItem } from "./initialState";
import { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	startLoading(name) {
		set((state) => ({
			phases: {
				...state.phases,
				[name]: {
					...(state.phases[name] || defaultLoadingItem),
					isLoading: true,
				},
			},
		}));
	},

	finishLoading(name) {
		set((state) => ({
			phases: {
				...state.phases,
				[name]: {
					...(state.phases[name] || defaultLoadingItem),
					isLoading: false,
				},
			},
		}));
	},

	startUpdating(name) {
		set((state) => ({
			phases: {
				...state.phases,
				[name]: {
					...(state.phases[name] || defaultLoadingItem),
					isUpdating: true,
				},
			},
		}));
	},

	finishUpdating(name) {
		set((state) => ({
			phases: {
				...state.phases,
				[name]: {
					...(state.phases[name] || defaultLoadingItem),
					isUpdating: false,
				},
			},
		}));
	},
});
