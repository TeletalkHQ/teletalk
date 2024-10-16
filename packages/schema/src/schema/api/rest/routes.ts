import { RouteGenerator } from "../../../classes";

// TODO: split different roots
export const httpRoutes = [
	new RouteGenerator({
		ioName: "createNewUser",
		isAuthRequired: true,
		method: "post",
		pathname: "create",
		rootPath: "auth",
	}),
	new RouteGenerator({
		ioName: "getAvatar",
		isAuthRequired: true,
		method: "get",
		pathname: "avatar",
		rootPath: "user",
	}),
	new RouteGenerator({
		ioName: "getCountries",
		isAuthRequired: false,
		method: "get",
		pathname: "countries",
		rootPath: "stuff",
	}),
	new RouteGenerator({
		ioName: "getWelcomeMessage",
		isAuthRequired: false,
		method: "get",
		pathname: "welcome-message",
		rootPath: "stuff",
	}),
	new RouteGenerator({
		ioName: "signIn",
		isAuthRequired: false,
		method: "post",
		pathname: "sign-in",
		rootPath: "auth",
	}),
	new RouteGenerator({
		ioName: "verify",
		isAuthRequired: true,
		method: "post",
		pathname: "verify",
		rootPath: "auth",
	}),
	new RouteGenerator({
		ioName: "getUserInfo",
		isAuthRequired: true,
		method: "get",
		pathname: "user-info",
		rootPath: "user",
	}),
] as const;

export type HTTPRouteShortName =
	(typeof httpRoutes)[number]["schema"]["ioName"];

export type HTTPRoutes = typeof httpRoutes;
