import { z } from "zod";

import {
	bioSchema,
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

export const createUserForm = z.object({
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

export const addContactForm = z.object({
	firstName: firstNameSchema,
	lastName: lastNameSchema.optional(),
	countryCode: countryCodeSchema,
	countryName: countryNameSchema,
	phoneNumber: phoneNumberSchema,
});
export const updateContactForm = addContactForm;

export type FormSchema = {
	addContactByPhone: typeof addContactForm;
	createUser: typeof createUserForm;
	messageInput: typeof messageInputForm;
	signIn: typeof signInForm;
	updateBio: typeof updateBioForm;
	updateContact: typeof updateContactForm;
	updateFullName: typeof updateFullNameForm;
	updateUsername: typeof updateUsernameForm;
	verifySignInCode: typeof verifySignInCodeForm;
};

export type FormSchemaName = keyof FormSchema;
