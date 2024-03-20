import type { Bio, Cellphone, FullName, Username } from "teletalk-type-store";

import { StoreSetFn } from ".";
import { VoidNoArgsFn, VoidWithArg } from "..";

export interface Profile extends Cellphone, FullName {
  bio: Bio;
  username: Username;
}

export interface SettingsState {
  profile: Profile;
}

export interface SettingsHandlers {
  updateProfile: VoidWithArg<Partial<Profile>>;
  reset: VoidNoArgsFn;
}

export type SettingsSetState = StoreSetFn<SettingsState>;

export type SettingsStore = SettingsHandlers & SettingsState;
