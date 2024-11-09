import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useAddContact = () => {
	return useMainEmitter({
		initialData,
		name: "addContact",
	});
};

const initialData = createEmitterInitialData("addContact", {
	newContact: {
		firstName: "",
		userId: "",
		countryCode: "",
		countryName: "",
		lastName: "",
		phoneNumber: "",
	},
});
