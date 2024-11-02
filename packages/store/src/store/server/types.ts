import { StoreSetFn } from "@repo/types";

export interface ServerState {}

export interface State {}

export interface Handlers {}

export type SetState = StoreSetFn<State>;
export type Store = State & Handlers;
