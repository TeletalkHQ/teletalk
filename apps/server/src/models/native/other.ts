import { nativeModelBuilder } from "~/classes/NativeModelBuilder";
import { Pong, WelcomeMessage } from "~/types";

export const otherModels = {
	welcomeMessage: nativeModelBuilder
		.create<WelcomeMessage>()
		.type("string")
		.required(true)
		.trim(true)
		.min(10)
		.max(100)
		.build(),
	pong: nativeModelBuilder
		.create<Pong>()
		.type("number")
		.required(true)
		.min(1)
		.max(10)
		.build(),
};
