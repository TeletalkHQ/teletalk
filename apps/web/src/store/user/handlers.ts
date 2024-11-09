import { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	setSelectedUserIdToBlock(id) {
		set({
			selectedUserIdToBlock: id,
		});
	},
	setSelectedUserIdToUnblock(id) {
		set({
			selectedUserIdToUnblock: id,
		});
	},
});
