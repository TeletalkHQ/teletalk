import {
	GetCountriesIO,
	GetStuffIO,
	GetWelcomeMessageIO,
	JoinIO,
	PingIO,
} from "teletalk-type-store";

import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import { validationModels } from "~/models/validation";

import { handlers } from "./handlers";

const builder = socketEventBuilder();

const getCountries = builder
	.create<GetCountriesIO>()
	.name("getCountries")
	.noAuth()
	.outputSchema({
		countries: {
			type: "array",
			items: {
				type: "object",
				props: {
					countryCode: validationModels.countryCode,
					countryName: validationModels.countryName,
					countryShortName: validationModels.countryShortName,
				},
			},
		},
	})
	.handler(handlers.getCountries)
	.build();

//FIXME: Add IO
const getStuff = builder
	.create<GetStuffIO>()
	.name("getStuff")
	.noAuth()
	.handler(handlers.getStuff)
	.build();

const getWelcomeMessage = builder
	.create<GetWelcomeMessageIO>()
	.name("getWelcomeMessage")
	.noAuth()
	.outputSchema({
		welcomeMessage: validationModels.welcomeMessage,
	})
	.handler(handlers.getWelcomeMessage)
	.build();

const ping = builder
	.create<PingIO>()
	.name("ping")
	.noAuth()
	.outputSchema({
		pong: validationModels.pong,
	})
	.handler(handlers.ping)
	.build();

//FIXME: Add IO
const join = builder
	.create<JoinIO>()
	.name("join")
	.handler(handlers.join)
	.method("once")
	.build();

export const other = {
	events: [getCountries, getStuff, getWelcomeMessage, join, ping],
	handlers,
};
