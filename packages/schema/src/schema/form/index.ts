import { z } from "zod";

import {
	bioSchema,
	contactsItemSchema,
	countryCodeSchema,
	countryNameSchema,
	firstNameSchema,
	fullNameSchema,
	lastNameSchema,
	messageTextSchema,
	phoneNumberSchema,
	signInCodeSchema,
	usernameSchema,
} from "../base";

export const signInForm = z.object({
	countryCode: countryCodeSchema,
	countryName: countryNameSchema,
	phoneNumber: phoneNumberSchema,
});

export const verifySignInCodeForm = z.object({
	signInCode: signInCodeSchema,
});

export const createNewUserForm = z.object({
	firstName: firstNameSchema,
	lastName: lastNameSchema,
});

export const messageInputForm = z.object({
	messageText: messageTextSchema,
});

export const updateBioForm = z.object({
	bio: bioSchema,
});

export const updateUsernameForm = z.object({
	username: usernameSchema,
});

export const updateFullNameForm = fullNameSchema;

export const addContactForm = contactsItemSchema;
export const updateContactForm = contactsItemSchema;

export type FormSchema = {
	addContact: typeof addContactForm;
	createNewUser: typeof createNewUserForm;
	messageInput: typeof messageInputForm;
	signIn: typeof signInForm;
	updateBio: typeof updateBioForm;
	updateContact: typeof updateContactForm;
	updateFullName: typeof updateFullNameForm;
	updateUsername: typeof updateUsernameForm;
	verifySignInCode: typeof verifySignInCodeForm;
};

export type FormSchemaName = keyof FormSchema;
