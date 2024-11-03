import { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	addSocket(newSocket) {
		set((state) => ({
			socketCollection: [...state.socketCollection, newSocket],
		}));
	},
});
