import { StoreSetFn, VoidWithArg } from "@repo/types";

export interface Handlers {
	setIsPermissionLoaded: VoidWithArg<boolean>;
}

export interface State {
	isPermissionLoaded: boolean;
}
export type SetState = StoreSetFn<State>;
export type Store = State & Handlers;
