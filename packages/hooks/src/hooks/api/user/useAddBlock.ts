import { addBlockEvent } from "@repo/schema";

import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useAddBlock = () => {
	return useMainEmitter({
		initialData,
		name: "addBlock",
		schema: addBlockEvent.schema,
	});
};

const initialData = createEmitterInitialData(addBlockEvent.schema, {
	blockedUser: {
		userId: "",
	},
});
