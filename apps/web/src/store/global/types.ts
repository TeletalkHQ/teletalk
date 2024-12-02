import { StoreSetFn } from "@repo/store";
import type { VoidNoArgs, VoidWithArg } from "@repo/types";

export type DrawerAnchor = "bottom" | "left" | "right" | "top";

export type OnContextMenu = VoidWithArg<React.MouseEvent>;

export type ExtendedOnContextMenu<T extends any = any> = (
	event: React.MouseEvent,
	arg: T
) => void;

type ContextMenuText = "Edit" | "Remove" | "Block" | "Unblock";

export interface ContextMenuItem {
	text: ContextMenuText;
	handler: (...args: any[]) => void;
}

export type ContextMenuList = ContextMenuItem[];

export type ContextMenuState = {
	position: {
		mouseX: number;
		mouseY: number;
	} | null;
	list: ContextMenuList;
};

export interface State {
	contextMenu: ContextMenuState;
	drawer: {
		anchor: DrawerAnchor;
		open: boolean;
	};
	isOnline: boolean;
	isInitialized: boolean;
}

export interface Handlers {
	closeContextMenu: VoidNoArgs;
	handleContextMenu: ExtendedOnContextMenu<ContextMenuList>;
	reset: VoidNoArgs;
	updateContextMenuList: VoidWithArg<ContextMenuList>;
	updateIsDrawerOpen: VoidWithArg<boolean>;
	updateIsInitialized: VoidWithArg<boolean>;
	updateOnlineStatus: VoidWithArg<boolean>;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
