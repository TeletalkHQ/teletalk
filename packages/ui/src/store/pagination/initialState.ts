import { State } from "./types";

const defaultPaginationState = {
	page: 1,
	perPage: 10,
	total: 0,
};

export const initialState: State = {
	pagination: {
		users: defaultPaginationState,
	},
};
