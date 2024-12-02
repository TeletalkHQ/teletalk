import { VoidWithArg } from "@repo/types";

import { StoreSetFn } from "../../utils";

export interface Handlers {
	setIsPermissionLoaded: VoidWithArg<boolean>;
}

export interface State {
	isPermissionLoaded: boolean;
}
export type SetState = StoreSetFn<State>;
export type Store = State & Handlers;
