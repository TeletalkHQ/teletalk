import type { HTTPRouteName } from "@repo/schema";
import type { StoreSetFn } from "@repo/store";
import { type VoidWithArg } from "@repo/types";

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
