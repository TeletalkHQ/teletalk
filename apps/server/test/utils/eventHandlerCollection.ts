import { EventName, EventSchema, findEvent } from "@repo/schema";
import { Socket } from "socket.io-client";

import { EventHandlerOptions, eventHandler } from "@/classes";

export const eventHandlerMaker = <T extends EventName>(name: T) => {
	const foundEvent = findEvent(name);

	return (socket: Socket, options?: EventHandlerOptions) => {
		return eventHandler(foundEvent.schema as EventSchema<T>, socket, options);
	};
};

export const eventHandlerCollection = {
	addBlock: eventHandlerMaker("addBlock"),
	addContact: eventHandlerMaker("addContact"),
	disconnect: eventHandlerMaker("disconnect"),
	getChatInfo: eventHandlerMaker("getChatInfo"),
	getClientStatus: eventHandlerMaker("getClientStatus"),
	getContacts: eventHandlerMaker("getContacts"),
	getOnlineClients: eventHandlerMaker("getOnlineClients"),
	getOnePrivateChat: eventHandlerMaker("getOnePrivateChat"),
	getPrivateChats: eventHandlerMaker("getPrivateChats"),
	getUserPublicInfo: eventHandlerMaker("getUserPublicInfo"),
	getUserInfo: eventHandlerMaker("getUserInfo"),
	join: eventHandlerMaker("join"),
	logout: eventHandlerMaker("logout"),
	ping: eventHandlerMaker("ping"),
	removeBlock: eventHandlerMaker("removeBlock"),
	removeContact: eventHandlerMaker("removeContact"),
	sendMessage: eventHandlerMaker("sendMessage"),
	updateAvatar: eventHandlerMaker("updateAvatar"),
	updateContact: eventHandlerMaker("updateContact"),
	updateUserPublicInfo: eventHandlerMaker("updateUserPublicInfo"),
};
