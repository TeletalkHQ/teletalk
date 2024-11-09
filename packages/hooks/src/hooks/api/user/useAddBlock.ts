import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useAddBlock = () => {
	return useMainEmitter({
		initialData,
		name: "addBlock",
	});
};

const initialData = createEmitterInitialData("addBlock", {
	blockedUser: {
		userId: "",
	},
});
