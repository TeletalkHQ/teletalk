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

const addContact = baseSchema.contactsItem;

export const formSchema = {
	addContact,
	createNewUser,
	messageInput,
	signIn,
	verifySignInCode,
};

export type FormSchema = typeof formSchema;

export type FormSchemaName = keyof FormSchema;
