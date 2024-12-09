import { initialState } from "./initialState";
import type { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	updateIsDrawerOpen(open) {
		set((prevState) => {
			return {
				drawer: {
					...prevState.drawer,
					open,
				},
			};
		});
	},

	updateIsInitialized(isInitialized) {
		set({
			isInitialized,
		});
	},

	updateOnlineStatus(isOnline) {
		set({
			isOnline,
		});
	},

	handleContextMenu(e: React.MouseEvent, list) {
		e.preventDefault();

		set((prevState) => ({
			contextMenu:
				prevState.contextMenu.position === null
					? {
							list,
							position: {
								mouseX: e.clientX + 2,
								mouseY: e.clientY - 6,
							},
						}
					: {
							list: [],
							position: null,
						},
		}));
	},

	updateContextMenuList(list) {
		set((prevState) => ({
			contextMenu: {
				...prevState.contextMenu,
				list,
			},
		}));
	},

	closeContextMenu() {
		set((prevState) => ({
			contextMenu: {
				...prevState.contextMenu,
				position: null,
			},
		}));
	},

	reset() {
		set(initialState);
	},
});
