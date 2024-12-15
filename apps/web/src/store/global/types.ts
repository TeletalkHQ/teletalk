import { type StoreSetFn } from "@repo/store";
import type { VoidNoArgs, VoidWithArg } from "@repo/types";

export type DrawerAnchor = "bottom" | "left" | "right" | "top";

export type OnContextMenu = VoidWithArg<React.MouseEvent>;

export interface State {
	drawer: {
		anchor: DrawerAnchor;
		open: boolean;
	};
	isOnline: boolean;
	isInitialized: boolean;
}

export interface Handlers {
	reset: VoidNoArgs;
	updateIsDrawerOpen: VoidWithArg<boolean>;
	updateIsInitialized: VoidWithArg<boolean>;
	updateOnlineStatus: VoidWithArg<boolean>;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
