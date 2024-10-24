import { HTTPRouteShortName } from "@repo/schema";
import {
	LoadingType,
	ProgressColor,
	StoreSetFn,
	VoidNoArgs,
	VoidWithArg,
} from "@repo/types";

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
	[key in HTTPRouteShortName]: LoadingItem;
};

export interface State {
	globalLoading: {
		color: React.CSSProperties["color"];
		open: boolean;
		progressColor: ProgressColor;
		size: 80;
		speedMultiplier: number;
		type: LoadingType;
	};
	phases: Partial<Phases>;
}

export interface Handlers {
	finishLoading: VoidWithArg<HTTPRouteShortName>;
	finishUpdating: VoidWithArg<HTTPRouteShortName>;
	setLoadingClose: VoidWithArg<LoadingType>;
	setOverlayLoadingClose: VoidNoArgs;
	startLoading: VoidWithArg<HTTPRouteShortName>;
	startUpdating: VoidWithArg<HTTPRouteShortName>;
}

export type SetState = StoreSetFn<State>;

export type Store = State & Handlers;
