import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useRemoveBlock = () => {
	return useMainEmitter({
		initialData,
		name: "removeBlock",
	});
};

const initialData = createEmitterInitialData("removeBlock", {
	unblockedUser: {
		userId: "",
	},
});
