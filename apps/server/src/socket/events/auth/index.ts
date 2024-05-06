import { models } from "@repo/validator";

import { socketEventBuilder } from "~/classes/SocketEventBuilder";

import { handlers } from "./handlers";

const builder = socketEventBuilder();

const createNewUser = builder
	.create<"createNewUser">()
	.name("createNewUser")
	.inputSchema({
		firstName: models.validation.firstName,
		lastName: models.validation.lastName,
	})
	.outputSchema({
		sessionId: models.validation.sessionId,
	})
	.handler(handlers.createNewUser)
	.build();

const logout = builder
	.create<"logout">()
	.name("logout")
	.handler(handlers.logout)
	.build();

const signIn = builder
	.create<"signIn">()
	.name("signIn")
	.noAuth()
	.inputSchema({
		countryCode: models.validation.countryCode,
		countryName: models.validation.countryName,
		phoneNumber: models.validation.phoneNumber,
	})
	.outputSchema({
		sessionId: models.validation.sessionId,
	})
	.handler(handlers.signIn)
	.build();

const verify = builder
	.create<"verify">()
	.name("verify")
	.inputSchema({
		verificationCode: models.validation.verificationCode,
	})
	.outputSchema({
		isNewUser: {
			type: "boolean",
		},
		sessionId: models.validation.sessionId,
	})
	.handler(handlers.verify)
	.build();

export const auth = {
	events: [createNewUser, logout, signIn, verify],
	handlers,
};
