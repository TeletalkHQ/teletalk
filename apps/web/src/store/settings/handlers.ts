import { SettingsHandlers, SettingsSetState } from "~/types";

import { initialState } from "./initialState";

export const handlers: (set: SettingsSetState) => SettingsHandlers = (set) => ({
  updateProfile(profile) {
    set((prevState) => ({
      profile: {
        ...prevState.profile,
        ...profile,
      },
    }));
  },

  reset() {
    set(initialState);
  },
});
