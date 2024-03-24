import {
	CreateNewUserIO,
	LogoutIO,
	SignInIO,
	VerifyIO,
} from "teletalk-type-store";

import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import { validationModels } from "~/models/validation";

import { handlers } from "./handlers";

const builder = socketEventBuilder();

const createNewUser = builder
	.create<CreateNewUserIO>()
	.name("createNewUser")
	.inputSchema({
		firstName: validationModels.firstName,
		lastName: validationModels.lastName,
	})
	.outputSchema({
		sessionId: validationModels.sessionId,
	})
	.handler(handlers.createNewUser)
	.build();

const logout = builder
	.create<LogoutIO>()
	.name("logout")
	.handler(handlers.logout)
	.build();

const signIn = builder
	.create<SignInIO>()
	.name("signIn")
	.noAuth()
	.inputSchema({
		countryCode: validationModels.countryCode,
		countryName: validationModels.countryName,
		phoneNumber: validationModels.phoneNumber,
	})
	.outputSchema({
		sessionId: validationModels.sessionId,
	})
	.handler(handlers.signIn)
	.build();

const verify = builder
	.create<VerifyIO>()
	.name("verify")
	.inputSchema({
		verificationCode: validationModels.verificationCode,
	})
	.outputSchema({
		isNewUser: {
			type: "boolean",
		},
		sessionId: validationModels.sessionId,
	})
	.handler(handlers.verify)
	.build();

export const auth = {
	events: [createNewUser, logout, signIn, verify],
	handlers,
};
