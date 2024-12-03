import { removeContactEvent } from "@repo/schema";

import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useRemoveContact = () => {
	return useMainEmitter({
		name: "removeContact",
		initialData,
		schema: removeContactEvent.schema,
	});
};

const initialData = createEmitterInitialData(removeContactEvent.schema, {
	removedContact: {
		userId: "",
	},
});
