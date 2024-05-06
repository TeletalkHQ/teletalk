import { models } from "@repo/validator";

import { socketEventBuilder } from "~/classes/SocketEventBuilder";

import { handlers } from "./handlers";

const builder = socketEventBuilder();

const getCountries = builder
	.create<"getCountries">()
	.name("getCountries")
	.noAuth()
	.outputSchema({
		countries: {
			type: "array",
			items: {
				type: "object",
				props: {
					countryCode: models.validation.countryCode,
					countryName: models.validation.countryName,
					countryShortName: models.validation.countryShortName,
				},
			},
		},
	})
	.handler(handlers.getCountries)
	.build();

//FIXME: Add IO
const getStuff = builder
	.create<"getStuff">()
	.name("getStuff")
	.noAuth()
	.handler(handlers.getStuff)
	.build();

const getWelcomeMessage = builder
	.create<"getWelcomeMessage">()
	.name("getWelcomeMessage")
	.noAuth()
	.outputSchema({
		welcomeMessage: models.validation.welcomeMessage,
	})
	.handler(handlers.getWelcomeMessage)
	.build();

const ping = builder
	.create<"ping">()
	.name("ping")
	.noAuth()
	.outputSchema({
		pong: models.validation.pong,
	})
	.handler(handlers.ping)
	.build();

//FIXME: Add IO
const join = builder
	.create<"join">()
	.name("join")
	.handler(handlers.join)
	.method("once")
	.build();

export const other = {
	events: [getCountries, getStuff, getWelcomeMessage, join, ping],
	handlers,
};
