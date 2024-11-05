import { EventGenerator, EventName } from "../../../classes";

export const socketEvents = {
	addContact: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "addContact",
	}),
	addBlock: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "addBlock",
	}),
	// connect: new EventGenerator({
	// 	isAuthRequired: false,
	// 	method: "on",
	// 	ioName: "connect",
	// }),
	// connect_error: new EventGenerator({
	// 	isAuthRequired: false,
	// 	method: "on",
	// 	ioName: "connect_error",
	// }),
	ping: new EventGenerator({
		isAuthRequired: false,
		method: "on",
		ioName: "ping",
	}),
	disconnect: new EventGenerator({
		isAuthRequired: false,
		method: "on",
		ioName: "disconnect",
	}),
	getChatInfo: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getChatInfo",
	}),
	getClientStatus: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getClientStatus",
	}),
	getContacts: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getContacts",
	}),
	getOnlineClients: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getOnlineClients",
	}),
	getOnePrivateChat: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getOnePrivateChat",
	}),
	getPrivateChats: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getPrivateChats",
	}),
	getUserPublicInfo: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getUserPublicInfo",
	}),
	getUserInfo: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getUserInfo",
	}),
	join: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "join",
	}),
	logout: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "logout",
	}),
	removeBlock: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "removeBlock",
	}),
	removeContact: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "removeContact",
	}),
	sendMessage: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "sendMessage",
	}),
	updateAvatar: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "updateAvatar",
	}),
	updateContact: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "updateContact",
	}),
	updateUserPublicInfo: new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "updateUserPublicInfo",
	}),
} satisfies Record<EventName, EventGenerator<EventName>>;

export type SocketEvents = typeof socketEvents;
export type Namespace = SocketEvents[EventName]["schema"]["namespace"];
