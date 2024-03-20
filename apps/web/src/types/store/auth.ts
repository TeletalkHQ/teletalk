import type {
  Cellphone,
  CountryCode,
  CountryName,
  FirstName,
  FullName,
  LastName,
  PhoneNumber,
  UnknownCellphone,
  VerificationCode,
} from "teletalk-type-store";

import {
  SelectedCountry,
  StoreSetFn,
  VoidNoArgsFn,
  VoidWithArg,
} from "~/types";

export interface AuthHandlers {
  reset: VoidNoArgsFn;
  updateCellphone: VoidWithArg<Partial<Cellphone>>;
  updateCountryCode: VoidWithArg<CountryCode>;
  updateCountryName: VoidWithArg<CountryName>;
  updateFirstName: VoidWithArg<FirstName>;
  updateLastName: VoidWithArg<LastName>;
  updatePhoneNumber: VoidWithArg<PhoneNumber>;
  updateSelectedCountry: VoidWithArg<SelectedCountry>;
  updateVerificationCode: VoidWithArg<VerificationCode>;
}

export interface AuthState extends UnknownCellphone, FullName {
  selectedCountry: SelectedCountry;
  verificationCode: VerificationCode;
}

export type AuthSetState = StoreSetFn<AuthState>;

export type AuthStore = AuthHandlers & AuthState;
