import { BaseSchema } from "@repo/schema";
import { VoidNoArgs, VoidWithArg } from "@repo/types";

import { StoreSetFn } from "../../utils";

export interface State {
	selectedCountry: BaseSchema.CountriesItem | null;
}

export interface Handlers {
	reset: VoidNoArgs;
	updateSelectedCountry: VoidWithArg<State["selectedCountry"]>;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
