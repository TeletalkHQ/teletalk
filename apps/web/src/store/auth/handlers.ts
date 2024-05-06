import { initialState } from "./initialState";
import { Handlers, SetState } from "./types";

export const handlers: (set: SetState) => Handlers = (set) => ({
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
