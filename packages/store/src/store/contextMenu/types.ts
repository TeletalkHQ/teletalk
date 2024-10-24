import { StoreSetFn, VoidNoArgs, VoidWithArg } from "@repo/types";

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

export interface Handlers {
	setContextMenu: VoidWithArg<ContextMenuState>;
	setContextMenuClose: VoidNoArgs;
}

export interface State {
	contextMenu: ContextMenuState;
}
export type SetState = StoreSetFn<State>;
export type Store = State & Handlers;
