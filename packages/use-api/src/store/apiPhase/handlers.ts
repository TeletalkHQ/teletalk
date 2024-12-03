import { defaultPhase } from "./initialState";
import { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	startLoading(name) {
		set((state) => ({
			phases: {
				...state.phases,
				[name]: {
					...(state.phases[name] || defaultPhase),
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
					...(state.phases[name] || defaultPhase),
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
					...(state.phases[name] || defaultPhase),
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
					...(state.phases[name] || defaultPhase),
					isUpdating: false,
				},
			},
		}));
	},
});
