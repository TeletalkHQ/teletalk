import { HTTPRouteName, RouteSchema, findHttpRoute } from "@repo/schema";
import { ZodSchema } from "zod";

import { HTTPHandlerOptions, httpHandler } from "@/classes";

export const httpHandlerMaker = <T extends HTTPRouteName>(name: T) => {
	const foundRoute = findHttpRoute(name);

	return (options?: HTTPHandlerOptions) => {
		return httpHandler(
			// FIXME: Read from somewhere else
			foundRoute.schema as RouteSchema<T, ZodSchema, ZodSchema>,
			options
		);
	};
};

export const httpHandlerCollection = {
	createNewUser: httpHandlerMaker("createNewUser"),
	getAvatar: httpHandlerMaker("getAvatar"),
	getCountries: httpHandlerMaker("getCountries"),
	getUserInfo: httpHandlerMaker("getUserInfo"),
	getWelcomeMessage: httpHandlerMaker("getWelcomeMessage"),
	logout: httpHandlerMaker("logout"),
	signIn: httpHandlerMaker("signIn"),
	verify: httpHandlerMaker("verify"),
};
