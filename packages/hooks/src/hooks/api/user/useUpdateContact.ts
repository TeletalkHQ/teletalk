import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useUpdateContact = () => {
	return useMainEmitter({
		name: "updateContact",
		initialData,
	});
};

const initialData = createEmitterInitialData("updateContact", {
	updatedContact: {
		countryCode: "",
		countryName: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		userId: "",
	},
});
