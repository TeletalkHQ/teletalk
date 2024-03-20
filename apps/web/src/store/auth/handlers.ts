import { AuthHandlers, AuthSetState } from "~/types";

import { initialState } from "./initialState";

export const handlers: (set: AuthSetState) => AuthHandlers = (set) => ({
  updateCountryCode(countryCode) {
    set({
      countryCode,
    });
  },
  updateCountryName(countryName) {
    set({
      countryName,
    });
  },
  updatePhoneNumber(phoneNumber) {
    set({
      phoneNumber,
    });
  },
  updateCellphone(c) {
    set(c);
  },
  updateVerificationCode(verificationCode) {
    set({
      verificationCode,
    });
  },
  updateFirstName(firstName) {
    set({
      firstName,
    });
  },
  updateLastName(lastName) {
    set({
      lastName,
    });
  },
  updateSelectedCountry(selectedCountry) {
    set({ selectedCountry });
  },

  reset() {
    set(initialState);
  },
});
