import type { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	setIsPermissionLoaded(isPermissionLoaded) {
		set({
			isPermissionLoaded,
		});
	},
});
