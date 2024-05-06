import type {
	Bio,
	Cellphone,
	FullName,
	Username,
	VoidNoArgsFn,
	VoidWithArg,
} from "@repo/type-store";

import { StoreSetFn } from "../utils";

export interface Profile extends Cellphone, FullName {
	bio: Bio;
	username: Username;
}

export interface State {
	profile: Profile;
}

export interface Handlers {
	updateProfile: VoidWithArg<Partial<Profile>>;
	reset: VoidNoArgsFn;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
