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
	VoidNoArgsFn,
	VoidWithArg,
} from "@repo/types";

import { GlobalStore } from "../global";
import { StoreSetFn } from "../utils";

export interface Handlers {
	reset: VoidNoArgsFn;
	updateCellphone: VoidWithArg<Partial<Cellphone>>;
	updateCountryCode: VoidWithArg<CountryCode>;
	updateCountryName: VoidWithArg<CountryName>;
	updateFirstName: VoidWithArg<FirstName>;
	updateLastName: VoidWithArg<LastName>;
	updatePhoneNumber: VoidWithArg<PhoneNumber>;
	updateSelectedCountry: VoidWithArg<GlobalStore.SelectedCountry>;
	updateVerificationCode: VoidWithArg<VerificationCode>;
}

export interface State extends UnknownCellphone, FullName {
	selectedCountry: GlobalStore.SelectedCountry;
	verificationCode: VerificationCode;
}

export type SetState = StoreSetFn<State>;

export type Store = Handlers & State;
