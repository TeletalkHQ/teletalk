"use client";

import { addContactByPhoneEvent } from "@repo/schema";

import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useAddContactByPhone = () => {
	return useMainEmitter({
		initialData,
		name: "addContactByPhone",
		schema: addContactByPhoneEvent.schema,
	});
};

const initialData = createEmitterInitialData(addContactByPhoneEvent.schema, {
	newContact: {
		firstName: "",
		userId: "",
		countryCode: "",
		countryName: "",
		lastName: "",
		phoneNumber: "",
	},
});
