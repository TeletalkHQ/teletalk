import type {
	EventSchema } from "@repo/schema";
import {
	addBlockEvent,
	addContactEvent,
	disconnectEvent,
	getChatInfoEvent,
	getClientStatusEvent,
	getContactsEvent,
	getOnePrivateChatEvent,
	getOnlineClientsEvent,
	getPrivateChatsEvent,
	getUserInfoEvent,
	getUserPublicInfoEvent,
	joinEvent,
	logoutEvent,
	pingEvent,
	removeBlockEvent,
	removeContactEvent,
	sendMessageEvent,
	updateAvatarEvent,
	updateContactEvent,
	updateUserPublicInfoEvent,
} from "@repo/schema";
import type { Socket } from "socket.io-client";

import type { EventHandlerOptions } from "@/classes";
import { eventHandler } from "@/classes";

export const eventHandlerMaker = <T extends EventSchema>(schema: T) => {
	return (socket: Socket, options?: EventHandlerOptions) => {
		return eventHandler(schema, socket, options);
	};
};

export const eventHandlerCollection = {
	addBlock: eventHandlerMaker(addBlockEvent.schema),
	addContact: eventHandlerMaker(addContactEvent.schema),
	disconnect: eventHandlerMaker(disconnectEvent.schema),
	getChatInfo: eventHandlerMaker(getChatInfoEvent.schema),
	getClientStatus: eventHandlerMaker(getClientStatusEvent.schema),
	getContacts: eventHandlerMaker(getContactsEvent.schema),
	getOnlineClients: eventHandlerMaker(getOnlineClientsEvent.schema),
	getOnePrivateChat: eventHandlerMaker(getOnePrivateChatEvent.schema),
	getPrivateChats: eventHandlerMaker(getPrivateChatsEvent.schema),
	getUserPublicInfo: eventHandlerMaker(getUserPublicInfoEvent.schema),
	getUserInfo: eventHandlerMaker(getUserInfoEvent.schema),
	join: eventHandlerMaker(joinEvent.schema),
	logout: eventHandlerMaker(logoutEvent.schema),
	ping: eventHandlerMaker(pingEvent.schema),
	removeBlock: eventHandlerMaker(removeBlockEvent.schema),
	removeContact: eventHandlerMaker(removeContactEvent.schema),
	sendMessage: eventHandlerMaker(sendMessageEvent.schema),
	updateAvatar: eventHandlerMaker(updateAvatarEvent.schema),
	updateContact: eventHandlerMaker(updateContactEvent.schema),
	updateUserPublicInfo: eventHandlerMaker(updateUserPublicInfoEvent.schema),
};
