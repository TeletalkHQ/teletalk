import { LoadingItem, State } from "./types";

export const defaultLoadingItem: LoadingItem = {
	isLoading: false,
	isUpdating: false,
};

export const initialState: State = {
	phases: {},
};
