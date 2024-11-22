import { z } from "zod";

import { baseSchema } from "../base";

const signIn = z.object({
	countryCode: baseSchema.countryCode,
	countryName: baseSchema.countryName,
	phoneNumber: baseSchema.phoneNumber,
});

const verifySignInCode = z.object({
	signInCode: baseSchema.signInCode,
});

const createNewUser = z.object({
	firstName: baseSchema.firstName,
	lastName: baseSchema.lastName,
});

const messageInput = z.object({
	messageText: baseSchema.messageText,
});

const updateBio = z.object({
	bio: baseSchema.bio,
});

const updateUsername = z.object({
	username: baseSchema.username,
});

const updateFullName = baseSchema.fullName;

const addContact = baseSchema.contactsItem;
const updateContact = baseSchema.contactsItem;

export const formSchema = {
	addContact,
	createNewUser,
	messageInput,
	signIn,
	updateBio,
	updateContact,
	updateFullName,
	updateUsername,
	verifySignInCode,
};

export type FormSchema = typeof formSchema;

export type FormSchemaName = keyof FormSchema;
