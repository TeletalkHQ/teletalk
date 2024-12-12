"use client";

import { addContactEvent } from "@repo/schema";

import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useAddContact = () => {
	return useMainEmitter({
		initialData,
		name: "addContact",
		schema: addContactEvent.schema,
	});
};

const initialData = createEmitterInitialData(addContactEvent.schema, {
	newContact: {
		firstName: "",
		userId: "",
		countryCode: "",
		countryName: "",
		lastName: "",
		phoneNumber: "",
	},
});
