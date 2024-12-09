import { EventGenerator, type EventName } from "../../../classes";
import {
	addBlockIO,
	addContactIO,
	disconnectIO,
	getChatInfoIO,
	getClientStatusIO,
	getContactsIO,
	getOnePrivateChatIO,
	getOnlineClientsIO,
	getPrivateChatsIO,
	getUserInfoIO,
	getUserPublicInfoIO,
	joinIO,
	logoutIO,
	pingIO,
	removeBlockIO,
	removeContactIO,
	sendMessageIO,
	updateAvatarIO,
	updateContactIO,
	updateUserPublicInfoIO,
} from "../io";

export const addContactEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "addContact",
	io: addContactIO,
	namespace: "",
});

export const addBlockEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "addBlock",
	io: addBlockIO,
	namespace: "",
});

//export const connectEvent = new EventGenerator({
// 	isAuthRequired: false,
// 	method: "on",
// 	ioName: "connect",
// io:connectIO
// });

// export const connect_errorEvent = new EventGenerator({
// 	isAuthRequired: false,
// 	method: "on",
// 	ioName: "connect_error",
// io: connect_errorIO;
// });

export const pingEvent = new EventGenerator({
	isAuthRequired: false,
	method: "on",
	ioName: "ping",
	io: pingIO,
	namespace: "",
});

export const disconnectEvent = new EventGenerator({
	isAuthRequired: false,
	method: "on",
	ioName: "disconnect",
	io: disconnectIO,
	namespace: "",
});

export const getChatInfoEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "getChatInfo",
	io: getChatInfoIO,
	namespace: "",
});

export const getClientStatusEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "getClientStatus",
	io: getClientStatusIO,
	namespace: "",
});

export const getContactsEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "getContacts",
	io: getContactsIO,
	namespace: "",
});

export const getOnlineClientsEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "getOnlineClients",
	io: getOnlineClientsIO,
	namespace: "",
});

export const getOnePrivateChatEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "getOnePrivateChat",
	io: getOnePrivateChatIO,
	namespace: "",
});

export const getPrivateChatsEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "getPrivateChats",
	io: getPrivateChatsIO,
	namespace: "",
});

export const getUserPublicInfoEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "getUserPublicInfo",
	io: getUserPublicInfoIO,
	namespace: "",
});

export const getUserInfoEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "getUserInfo",
	io: getUserInfoIO,
	namespace: "",
});

export const joinEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "join",
	io: joinIO,
	namespace: "",
});

export const logoutEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "logout",
	io: logoutIO,
	namespace: "",
});

export const removeBlockEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "removeBlock",
	io: removeBlockIO,
	namespace: "",
});

export const removeContactEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "removeContact",
	io: removeContactIO,
	namespace: "",
});

export const sendMessageEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "sendMessage",
	io: sendMessageIO,
	namespace: "",
});

export const updateAvatarEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "updateAvatar",
	io: updateAvatarIO,
	namespace: "",
});

export const updateContactEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "updateContact",
	io: updateContactIO,
	namespace: "",
});

export const updateUserPublicInfoEvent = new EventGenerator({
	isAuthRequired: true,
	method: "on",
	ioName: "updateUserPublicInfo",
	io: updateUserPublicInfoIO,
	namespace: "",
});

export const socketEvents = {
	addBlock: addBlockEvent,
	addContact: addContactEvent,
	disconnect: disconnectEvent,
	getChatInfo: getChatInfoEvent,
	getClientStatus: getClientStatusEvent,
	getContacts: getContactsEvent,
	getOnePrivateChat: getOnePrivateChatEvent,
	getOnlineClients: getOnlineClientsEvent,
	getPrivateChats: getPrivateChatsEvent,
	getUserInfo: getUserInfoEvent,
	getUserPublicInfo: getUserPublicInfoEvent,
	join: joinEvent,
	logout: logoutEvent,
	// connect: connectEvent,
	// connect_error: connect_errorEvent,
	ping: pingEvent,
	removeBlock: removeBlockEvent,
	removeContact: removeContactEvent,
	sendMessage: sendMessageEvent,
	updateAvatar: updateAvatarEvent,
	updateContact: updateContactEvent,
	updateUserPublicInfo: updateUserPublicInfoEvent,
} satisfies Record<EventName, EventGenerator>;

export type SocketEvents = typeof socketEvents;

export type Namespace = SocketEvents[EventName]["schema"]["namespace"];
