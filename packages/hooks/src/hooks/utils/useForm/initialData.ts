import { FormSchema, FormSchemaName } from "@repo/schema";
import { z } from "zod";

export const formInitialData = {
	createNewUser: {
		firstName: "",
		lastName: "",
	},
	signIn: {
		countryCode: "",
		countryName: "",
		phoneNumber: "",
	},
	verifySignInCode: {
		signInCode: "",
	},
} satisfies {
	// eslint-disable-next-line no-use-before-define
	[K in FormSchemaName]: z.infer<FormSchema[K]>;
};
