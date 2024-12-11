import { maker } from "@repo/classes";
import type { FormSchema, FormSchemaName } from "@repo/schema";
import type { z } from "zod";

export const formInitialData = {
	addContact: maker.emptyContact(),
	createUser: maker.emptyFullName(),
	messageInput: {
		messageText: "",
	},
	signIn: maker.emptyCellphone(),
	updateBio: {
		bio: "",
	},
	updateContact: {
		countryCode: "",
		countryName: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		userId: "",
	},
	updateFullName: {
		firstName: "",
		lastName: "",
	},
	updateUsername: {
		username: "",
	},
	verifySignInCode: {
		signInCode: "",
	},
} satisfies {
	// eslint-disable-next-line no-use-before-define
	[K in FormSchemaName]: z.infer<FormSchema[K]>;
};
