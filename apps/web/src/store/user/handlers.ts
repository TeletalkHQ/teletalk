import { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	setUserIdToBlock(id) {
		set({
			userIdToBlock: id,
		});
	},
	setUserIdToUnblock(id) {
		set({
			userIdToUnblock: id,
		});
	},
	setUserIdToChat(id) {
		set({
			userIdToChat: id,
		});
	},
});
