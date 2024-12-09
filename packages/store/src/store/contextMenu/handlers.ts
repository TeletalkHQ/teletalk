import type { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	setContextMenu(contextMenuState) {
		set({
			contextMenu: contextMenuState,
		});
	},
	setContextMenuClose() {
		set((prevState) => ({
			contextMenu: { ...prevState.contextMenu, position: null },
		}));
	},
});
