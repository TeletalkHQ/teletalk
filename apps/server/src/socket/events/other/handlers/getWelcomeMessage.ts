import { GetWelcomeMessageIO } from "@repo/type-store";

import { SocketOnHandler } from "~/types";

export const getWelcomeMessage: SocketOnHandler<
	GetWelcomeMessageIO
> = async () => {
	return {
		data: {
			welcomeMessage: "Hey! Welcome to teletalk <3",
		},
	};
};
