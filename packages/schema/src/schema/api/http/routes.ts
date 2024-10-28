import { ZodSchema } from "zod";

import { RouteGenerator, RouteName } from "../../../classes";

// TODO: split different roots
export const httpRoutes = {
	createNewUser: new RouteGenerator({
		ioName: "createNewUser",
		isAuthRequired: true,
		method: "post",
		pathname: "create",
		rootPath: "auth",
	}),
	getAvatar: new RouteGenerator({
		ioName: "getAvatar",
		isAuthRequired: true,
		method: "get",
		pathname: "avatar",
		rootPath: "user",
	}),
	getCountries: new RouteGenerator({
		ioName: "getCountries",
		isAuthRequired: false,
		method: "get",
		pathname: "countries",
		rootPath: "stuff",
	}),
	getWelcomeMessage: new RouteGenerator({
		ioName: "getWelcomeMessage",
		isAuthRequired: false,
		method: "get",
		pathname: "welcome-message",
		rootPath: "stuff",
	}),
	signIn: new RouteGenerator({
		ioName: "signIn",
		isAuthRequired: false,
		method: "post",
		pathname: "sign-in",
		rootPath: "auth",
	}),
	verify: new RouteGenerator({
		ioName: "verify",
		isAuthRequired: true,
		method: "post",
		pathname: "verify",
		rootPath: "auth",
	}),
	getUserInfo: new RouteGenerator({
		ioName: "getUserInfo",
		isAuthRequired: true,
		method: "get",
		pathname: "user-info",
		rootPath: "user",
	}),
	logout: new RouteGenerator({
		ioName: "logout",
		isAuthRequired: true,
		method: "get",
		pathname: "logout",
		rootPath: "auth",
	}),
	userFcm: new RouteGenerator({
		ioName: "userFcm",
		isAuthRequired: true,
		method: "get",
		pathname: "logout",
		rootPath: "auth",
	}),
} satisfies Record<RouteName, RouteGenerator<RouteName, ZodSchema, ZodSchema>>;

export type HTTPRouteName = RouteName;

export type HTTPRoutes = typeof httpRoutes;
