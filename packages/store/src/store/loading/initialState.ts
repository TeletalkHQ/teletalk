import { LoadingItem, State } from "./types";

export const defaultLoadingItem: LoadingItem = {
	isLoading: false,
	isUpdating: false,
};

export const initialState: State = {
	globalLoading: {
		color: "wheat",
		open: false,
		progressColor: "inherit",
		size: 80,
		speedMultiplier: 1,
		type: "FULL_PAGE",
	},

	phases: {},
};
