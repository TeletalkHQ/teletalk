import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useRemoveContact = () => {
	return useMainEmitter({
		name: "removeContact",
		initialData,
	});
};

const initialData = createEmitterInitialData("removeContact", {
	removedContact: {
		userId: "",
	},
});
