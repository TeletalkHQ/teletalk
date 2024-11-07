import { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	setSelectedChatId(id) {
		set({
			selectedChatId: id,
		});
	},
});
