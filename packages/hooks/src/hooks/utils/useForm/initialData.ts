import { maker } from "@repo/classes";
import { FormSchema, FormSchemaName } from "@repo/schema";
import { z } from "zod";

export const formInitialData = {
	addContact: maker.emptyContact(),
	createNewUser: maker.emptyFullName(),
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
