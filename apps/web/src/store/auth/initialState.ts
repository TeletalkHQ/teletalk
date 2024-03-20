import { AuthState } from "~/types";

export const initialState: AuthState = {
  countryCode: "",
  countryName: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  selectedCountry: null,
  verificationCode: "",
};
