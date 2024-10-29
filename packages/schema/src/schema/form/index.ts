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

export const formSchema = {
	signIn,
	verifySignInCode,
	createNewUser,
};

export type FormSchema = typeof formSchema;

export type FormSchemaName = keyof FormSchema;
