"use client";

import { updateUserPublicInfoEvent } from "@repo/schema";

import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useUpdateUserPublicInfo = () => {
	return useMainEmitter({
		name: "updateUserPublicInfo",
		initialData,
		schema: updateUserPublicInfoEvent.schema,
	});
};

const initialData = createEmitterInitialData(updateUserPublicInfoEvent.schema, {
	updatedPublicInfo: {
		bio: "",
		firstName: "",
		lastName: "",
		userId: "",
		username: "",
	},
});
