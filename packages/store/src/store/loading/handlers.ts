import { defaultLoadingItem } from "./initialState";
import { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	setLoadingClose(type) {
		set((prevState) => {
			return {
				globalLoading: {
					...prevState.globalLoading,
					open: false,
					type: type || prevState.globalLoading.type,
				},
			};
		});
	},

	setOverlayLoadingClose() {
		this.setLoadingClose("OVERLAY");
	},

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
