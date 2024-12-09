import type { Handlers, SetState } from "./types";

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
	setUserIdForEditContact(id) {
		set({
			userIdForEditContact: id,
		});
	},
	setUserIdForRemoveContact(id) {
		set({
			userIdForRemoveContact: id,
		});
	},
});
