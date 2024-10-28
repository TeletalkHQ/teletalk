import { FormSchema, FormSchemaName } from "@repo/schema";
import { z } from "zod";

export const formInitialData = {
	signIn: {
		countryCode: "",
		countryName: "",
		phoneNumber: "",
	},
} satisfies {
	// eslint-disable-next-line no-use-before-define
	[K in FormSchemaName]: z.infer<FormSchema[K]>;
};
