import { updateContactEvent } from "@repo/schema";

import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useUpdateContact = () => {
	return useMainEmitter({
		name: "updateContact",
		initialData,
		schema: updateContactEvent.schema,
	});
};

const initialData = createEmitterInitialData(updateContactEvent.schema, {
	updatedContact: {
		countryCode: "",
		countryName: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		userId: "",
	},
});
