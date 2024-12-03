import { maker } from "@repo/classes";
import { sendMessageEvent } from "@repo/schema";

import { createEmitterInitialData, useMainEmitter } from "../useMainEmitter";

export const useSendMessage = () => {
	return useMainEmitter({
		initialData,
		name: "sendMessage",
		schema: sendMessageEvent.schema,
	});
};

const initialData = createEmitterInitialData(sendMessageEvent.schema, {
	addedMessage: maker.emptyMessageItem(),
	chatId: "",
});
