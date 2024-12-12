import type { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	setSelectedUUID(to, value) {
		set((state) => ({
			selectedUUID: {
				...state.selectedUUID,
				to: {
					...state.selectedUUID.to,
					[to]: value,
				},
			},
		}));
	},
});
