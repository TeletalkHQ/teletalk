import { HTTPRouteShortName, RouteSchema, findHttpRoute } from "@repo/schema";

import { HTTPHandlerOptions, httpHandler } from "@/classes/HTTPHandler";

export const httpHandlerMaker = <T extends HTTPRouteShortName>(name: T) => {
	const foundRoute = findHttpRoute(name);

	if (!foundRoute) throw Error("HTTP_ROUTE_COULD_NOT_FOUND");

	return (options?: HTTPHandlerOptions) => {
		return httpHandler(foundRoute.schema as RouteSchema<T>, options);
	};
};

// export const setupRequester = async <T extends IOName>(
// 	requester: RequesterMaker<T>,
// 	cellphone?: BaseSchema.Cellphone,
// 	fullName?: BaseSchema.FullName
// ) => {
// 	const { socket, user } = await randomMaker.e2eUser(cellphone, fullName);
// 	return {
// 		requester: requester(socket),
// 		user,
// 		socket,
// 	};
// };

export const httpHandlerCollection = {
	// addContactWithCellphone: httpHandlerMaker("addContactWithCellphone"),
	// blockUser: httpHandlerMaker("addBlock"),
	createNewUser: httpHandlerMaker("createNewUser"),
	// disconnect: httpHandlerMaker("disconnect"),
	getAvatar: httpHandlerMaker("getAvatar"),
	// getChatInfo: httpHandlerMaker("getChatInfo"),
	// getClientStatus: httpHandlerMaker("getClientStatus"),
	// getContacts: httpHandlerMaker("getContacts"),
	getCountries: httpHandlerMaker("getCountries"),
	// getOnlineClients: httpHandlerMaker("getOnlineClients"),
	// getPrivateChat: httpHandlerMaker("getPrivateChat"),
	// getPrivateChats: httpHandlerMaker("getPrivateChats"),
	// getPublicData: httpHandlerMaker("getPublicData"),
	// getStuff: httpHandlerMaker("getStuff"),
	// getUserData: httpHandlerMaker("getUserData"),
	getWelcomeMessage: httpHandlerMaker("getWelcomeMessage"),
	// join: httpHandlerMaker("join"),
	// logout: httpHandlerMaker("logout"),
	// ping: httpHandlerMaker("ping"),
	// removeBlock: httpHandlerMaker("removeBlock"),
	// removeContact: httpHandlerMaker("removeContact"),
	// sendMessage: httpHandlerMaker("sendMessage"),
	signIn: httpHandlerMaker("signIn"),
	// updateAvatar: httpHandlerMaker("updateAvatar"),
	// updateContact: httpHandlerMaker("updateContact"),
	// updatePublicData: httpHandlerMaker("updatePublicData"),
	verify: httpHandlerMaker("verify"),
};
