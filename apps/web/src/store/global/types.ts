import { StoreSetFn } from "@repo/store";
import type { LoadingType, VoidNoArgs, VoidWithArg } from "@repo/types";
import { CircularProgressProps } from "@repo/ui";
import { CSSProperties } from "react";

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

export interface Handlers {
	changeDrawerOpen: VoidWithArg<boolean>;
	closeContextMenu: VoidNoArgs;
	closeFullPageLoading: VoidNoArgs;
	closeLoading: VoidWithArg<LoadingType>;
	closeOverlayLoading: VoidNoArgs;
	handleContextMenu: ExtendedOnContextMenu<ContextMenuList>;
	openFullPageLoading: VoidNoArgs;
	openLoading: VoidWithArg<LoadingType>;
	openOverlayLoading: VoidNoArgs;
	reset: VoidNoArgs;
	updateContextMenuList: VoidWithArg<ContextMenuList>;
	updateIsInitialized: VoidWithArg<boolean>;
	updateOnlineStatus: VoidWithArg<boolean>;
}

export interface LoadingState {
	color: "blue";
	open: false;
	progressColor: "inherit";
	size: number;
	speedMultiplier: number;
	type: LoadingType;
}

export interface State {
	contextMenu: ContextMenuState;
	drawer: {
		anchor: DrawerAnchor;
		open: boolean;
	};
	isOnline: boolean;
	loading: {
		color: CSSProperties["color"];
		open: boolean;
		progressColor: CircularProgressProps["color"];
		size: 80;
		speedMultiplier: number;
		type: LoadingType;
	};
	isInitialized: boolean;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
