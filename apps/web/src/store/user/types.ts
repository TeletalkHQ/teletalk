import { StoreSetFn } from "@repo/store";
import { VoidWithArg } from "@repo/types";

export interface State {
	selectedUserIdToBlock: string | undefined;
	selectedUserIdToUnblock: string | undefined;
}

export interface Handlers {
	setSelectedUserIdToBlock: VoidWithArg<State["selectedUserIdToBlock"]>;
	setSelectedUserIdToUnblock: VoidWithArg<State["selectedUserIdToUnblock"]>;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
