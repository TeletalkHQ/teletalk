import type { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	updatePagination({ name, props }) {
		set((state) => ({
			pagination: {
				...state.pagination,
				[name]: {
					...state.pagination[name],
					...props,
				},
			},
		}));
	},
});
