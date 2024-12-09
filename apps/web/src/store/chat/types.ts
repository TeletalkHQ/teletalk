import { type StoreSetFn } from "@repo/store";
import { type VoidWithArg } from "@repo/types";

export interface State {
	selectedChatId: string | undefined;
}

export interface Handlers {
	setSelectedChatId: VoidWithArg<State["selectedChatId"]>;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
