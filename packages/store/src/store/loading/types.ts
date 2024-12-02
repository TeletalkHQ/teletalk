import { HTTPRouteName } from "@repo/schema";
import { VoidWithArg } from "@repo/types";

import { StoreSetFn } from "../../utils";

export type SidebarName = "welcome";

export type OnOpenDrawer = (name: SidebarName) => void;

export interface PanelBaseProps {
	onOpenDrawer: OnOpenDrawer;
}

export interface LoadingItem {
	isLoading: boolean;
	isUpdating: boolean;
}

export type Phases = {
	[key in HTTPRouteName]: LoadingItem;
};

export interface State {
	phases: Partial<Phases>;
}

export interface Handlers {
	finishLoading: VoidWithArg<HTTPRouteName>;
	finishUpdating: VoidWithArg<HTTPRouteName>;
	startLoading: VoidWithArg<HTTPRouteName>;
	startUpdating: VoidWithArg<HTTPRouteName>;
}

export type SetState = StoreSetFn<State>;

export type Store = State & Handlers;
