import { SocketOnHandler } from "@repo/hl-types";

export const getWelcomeMessage: SocketOnHandler<
	"getWelcomeMessage"
> = async () => {
	return {
		data: {
			welcomeMessage: "Hey! Welcome to teletalk <3",
		},
	};
};
