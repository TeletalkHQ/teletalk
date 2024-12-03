import { RouteGenerator, RouteName } from "../../../classes";
import {
	createNewUserIO,
	getAvatarIO,
	getCountriesIO,
	getUserInfoIO,
	getWelcomeMessageIO,
	logoutIO,
	pingIO,
	signInIO,
	userFcmIO,
	verifyIO,
} from "../io";

export const createNewUserRoute = new RouteGenerator({
	ioName: "createNewUser",
	isAuthRequired: true,
	method: "post",
	io: createNewUserIO,
	endpoint: "auth/create",
});

export const getAvatarRoute = new RouteGenerator({
	ioName: "getAvatar",
	isAuthRequired: true,
	method: "get",
	io: getAvatarIO,
	endpoint: "user/avatar",
});

export const getCountriesRoute = new RouteGenerator({
	ioName: "getCountries",
	isAuthRequired: false,
	method: "get",
	io: getCountriesIO,
	endpoint: "stuff/countries",
});

export const getWelcomeMessageRoute = new RouteGenerator({
	ioName: "getWelcomeMessage",
	isAuthRequired: false,
	method: "get",
	io: getWelcomeMessageIO,
	endpoint: "stuff/welcome-message",
});

export const signInRoute = new RouteGenerator({
	ioName: "signIn",
	isAuthRequired: false,
	method: "post",
	io: signInIO,
	endpoint: "auth/sign-in",
});

export const verifyRoute = new RouteGenerator({
	ioName: "verify",
	isAuthRequired: true,
	method: "post",
	io: verifyIO,
	endpoint: "auth/verify",
});

export const getUserInfoRoute = new RouteGenerator({
	ioName: "getUserInfo",
	isAuthRequired: true,
	method: "get",
	io: getUserInfoIO,
	endpoint: "user/user-info",
});

export const logoutRoute = new RouteGenerator({
	ioName: "logout",
	isAuthRequired: true,
	method: "get",
	io: logoutIO,
	endpoint: "auth/logout",
});

export const userFcmRoute = new RouteGenerator({
	ioName: "userFcm",
	isAuthRequired: true,
	method: "get",
	io: userFcmIO,
	endpoint: "auth/logout",
});

export const pingRoute = new RouteGenerator({
	ioName: "ping",
	isAuthRequired: false,
	method: "get",
	io: pingIO,
	endpoint: "server-info/ping",
}); // TODO: split different roots

export const httpRoutes = {
	createNewUser: createNewUserRoute,
	getAvatar: getAvatarRoute,
	getCountries: getCountriesRoute,
	getUserInfo: getUserInfoRoute,
	getWelcomeMessage: getWelcomeMessageRoute,
	logout: logoutRoute,
	ping: pingRoute,
	signIn: signInRoute,
	userFcm: userFcmRoute,
	verify: verifyRoute,
} satisfies Record<RouteName, RouteGenerator>;
export type HTTPRouteName = RouteName;
export type HTTPRoutes = typeof httpRoutes;
