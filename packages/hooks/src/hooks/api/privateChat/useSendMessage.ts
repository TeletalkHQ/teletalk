import { maker } from "@repo/classes";

import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useSendMessage = () => {
	return useMainEmitter({
		initialData,
		name: "sendMessage",
	});
};

const initialData = createEmitterInitialData("sendMessage", {
	addedMessage: maker.emptyMessageItem(),
	chatId: "",
});
