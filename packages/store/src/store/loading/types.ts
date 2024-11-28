import { HTTPRouteName } from "@repo/schema";
import { LoadingType, StoreSetFn, VoidNoArgs, VoidWithArg } from "@repo/types";

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
	globalLoading: {
		color: React.CSSProperties["color"];
		open: boolean;
		// progressColor: ProgressColor;
		progressColor: string;
		size: 80;
		speedMultiplier: number;
		type: LoadingType;
	};
	phases: Partial<Phases>;
}

export interface Handlers {
	finishLoading: VoidWithArg<HTTPRouteName>;
	finishUpdating: VoidWithArg<HTTPRouteName>;
	setLoadingClose: VoidWithArg<LoadingType>;
	setOverlayLoadingClose: VoidNoArgs;
	startLoading: VoidWithArg<HTTPRouteName>;
	startUpdating: VoidWithArg<HTTPRouteName>;
}

export type SetState = StoreSetFn<State>;

export type Store = State & Handlers;
