import { LoadingItem, State } from "./types";

export const defaultPhase: LoadingItem = {
	isLoading: false,
	isUpdating: false,
};

export const initialState: State = {
	phases: {},
};
