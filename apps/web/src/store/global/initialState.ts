import { type State } from "./types";

export const initialState: State = {
	drawer: {
		//TODO: appConfigs.getConfigs().ui.drawerDefaultAnchor
		anchor: "left",
		open: false,
	},
	isInitialized: false,
	isOnline: false,
};
