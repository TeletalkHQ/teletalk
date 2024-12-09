import { type StoreSetFn } from "@repo/store";
import { type VoidWithArg } from "@repo/types";

export interface State {
	userIdToBlock: string | undefined;
	userIdToUnblock: string | undefined;
	userIdToChat: string | undefined;
	userIdForRemoveContact: string | undefined;
	userIdForEditContact: string | undefined;
}

export interface Handlers {
	setUserIdToBlock: VoidWithArg<State["userIdToBlock"]>;
	setUserIdToUnblock: VoidWithArg<State["userIdToUnblock"]>;
	setUserIdToChat: VoidWithArg<State["userIdToChat"]>;
	setUserIdForRemoveContact: VoidWithArg<State["userIdForRemoveContact"]>;
	setUserIdForEditContact: VoidWithArg<State["userIdForEditContact"]>;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
