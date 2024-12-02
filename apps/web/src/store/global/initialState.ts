import { State } from "./types";

export const initialState: State = {
	contextMenu: {
		list: [],
		position: null,
	},
	drawer: {
		//TODO: appConfigs.getConfigs().ui.drawerDefaultAnchor
		anchor: "left",
		open: false,
	},
	isInitialized: false,
	isOnline: false,
};
