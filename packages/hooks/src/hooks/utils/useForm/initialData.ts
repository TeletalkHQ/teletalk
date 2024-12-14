import { maker } from "@repo/classes";

export const addContactFormDefaultValues = maker.emptyContact();

export const createUserFormDefaultValues = maker.emptyFullName();

export const signInFormDefaultValues = maker.emptyCellphone();

export const messageInputFormDefaultValues = {
	messageText: "",
};
export const updateBioFormDefaultValues = {
	bio: "",
};
export const updateContactFormDefaultValues = {
	countryCode: "",
	countryName: "",
	firstName: "",
	lastName: "",
	phoneNumber: "",
	userId: "",
};
export const updateFullNameFormDefaultValues = {
	firstName: "",
	lastName: "",
};
export const updateUsernameFormDefaultValues = {
	username: "",
};
export const verifySignInCodeFormDefaultValues = {
	signInCode: "",
};
