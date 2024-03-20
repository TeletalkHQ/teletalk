import { SettingsState } from "~/types";

export const initialState: SettingsState = {
  profile: {
    bio: "",
    countryCode: "1",
    countryName: "United States",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    username: "",
  },
};
