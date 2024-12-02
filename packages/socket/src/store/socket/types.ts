import { StoreSetFn } from "@repo/store";

export interface State {}

export interface Handlers {}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
