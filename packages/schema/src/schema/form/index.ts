import { z } from "zod";

import { baseSchema } from "../base";

const signIn = z.object({
	countryCode: baseSchema.countryCode,
	countryName: baseSchema.countryName,
	phoneNumber: baseSchema.phoneNumber,
});

export const formSchema = {
	signIn,
};

export type FormSchema = typeof formSchema;

export type FormSchemaName = keyof FormSchema;
