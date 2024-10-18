import { HTTPRouteShortName, RouteSchema, findHttpRoute } from "@repo/schema";

import { HTTPHandlerOptions, httpHandler } from "@/classes";

export const httpHandlerMaker = <T extends HTTPRouteShortName>(name: T) => {
	const foundRoute = findHttpRoute(name);

	return (options?: HTTPHandlerOptions) => {
		return httpHandler(foundRoute.schema as RouteSchema<T>, options);
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
