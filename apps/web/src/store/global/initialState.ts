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
	loading: {
		color: "wheat",
		open: false,
		progressColor: "inherit",
		size: 80,
		speedMultiplier: 1,
		type: "FULL_PAGE",
	},
};
