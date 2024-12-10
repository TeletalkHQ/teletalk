import { RouteSchema } from "@repo/schema";
import {
	createNewUserRoute,
	getAvatarRoute,
	getCountriesRoute,
	getUserInfoRoute,
	getWelcomeMessageRoute,
	logoutRoute,
	signInRoute,
	verifyRoute,
} from "@repo/schema";

import { HTTPHandlerOptions } from "@/classes";
import { httpHandler } from "@/classes";

export const httpHandlerMaker = <T extends RouteSchema>(schema: T) => {
	return (options?: HTTPHandlerOptions) => {
		return httpHandler<T>(schema, options);
	};
};

export const httpHandlerCollection = {
	createNewUser: httpHandlerMaker(createNewUserRoute.schema),
	getAvatar: httpHandlerMaker(getAvatarRoute.schema),
	getCountries: httpHandlerMaker(getCountriesRoute.schema),
	getUserInfo: httpHandlerMaker(getUserInfoRoute.schema),
	getWelcomeMessage: httpHandlerMaker(getWelcomeMessageRoute.schema),
	logout: httpHandlerMaker(logoutRoute.schema),
	signIn: httpHandlerMaker(signInRoute.schema),
	verify: httpHandlerMaker(verifyRoute.schema),
};
