import { StoreSetFn } from "@repo/store";
import { VoidWithArg } from "@repo/types";

export interface State {
	selectedChatId: string | undefined;
}

export interface Handlers {
	setSelectedChatId: VoidWithArg<State["selectedChatId"]>;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
