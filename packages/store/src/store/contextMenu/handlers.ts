import type { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
	setMenu({ e, list }) {
		e.preventDefault();

		set({
			menu: {
				list,
				position: {
					mouseX: e.clientX + 2,
					mouseY: e.clientY - 6,
				},
			},
		});
	},

	updateMenu(newMenu) {
		set((prevState) => ({
			menu: {
				...prevState.menu,
				...newMenu,
			},
		}));
	},

	closeMenu() {
		set((prevState) => ({
			menu: {
				...prevState.menu,
				position: null,
			},
		}));
	},
});
