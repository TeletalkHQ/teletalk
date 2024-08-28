import { SocketOnHandler } from "@repo/socket";

export const getWelcomeMessage: SocketOnHandler<
	"getWelcomeMessage"
> = async () => {
	return {
		data: {
			welcomeMessage: "Hey! Welcome to teletalk <3",
		},
	};
};
