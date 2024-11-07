import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useUpdateUserPublicInfo = () => {
	return useMainEmitter({
		name: "updateUserPublicInfo",
		initialData,
	});
};

const initialData = createEmitterInitialData("updateUserPublicInfo", {
	updatedPublicInfo: {
		bio: "",
		firstName: "",
		lastName: "",
		userId: "",
		username: "",
	},
});
