import type { VoidNoArgs, VoidWithArg } from "@repo/types";

import { type StoreSetFn } from "../../utils";

export type OnContextMenu<T extends any = any> = (
	event: React.MouseEvent,
	arg: T
) => void;

export interface MenuListItem {
	text: string;
	handler: (...args: any[]) => void;
}

export type MenuList = MenuListItem[];

export type MenuPosition = {
	mouseX: number;
	mouseY: number;
};

export type MenuState = {
	position: MenuPosition | null;
	list: MenuList;
};

export interface Handlers {
	closeMenu: VoidNoArgs;
	setMenu: VoidWithArg<{
		e: React.MouseEvent;
		list: MenuList;
	}>;
	updateMenu: VoidWithArg<Partial<MenuState>>;
}

export interface State {
	menu: MenuState;
}
export type SetState = StoreSetFn<State>;

export type Store = State & Handlers;
