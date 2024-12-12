"use client";

import { removeBlockEvent } from "@repo/schema";

import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useRemoveBlock = () => {
	return useMainEmitter({
		initialData,
		name: "removeBlock",
		schema: removeBlockEvent.schema,
	});
};

const initialData = createEmitterInitialData(removeBlockEvent.schema, {
	unblockedUser: {
		userId: "",
	},
});
