import { EventGenerator } from "../../../classes";

export const socketEvents = [
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "addContactWithCellphone",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "addBlock",
	}),
	// new EventGenerator({
	// 	isAuthRequired: false,
	// 	method: "on",
	// 	ioName: "connect",
	// }),
	// new EventGenerator({
	// 	isAuthRequired: false,
	// 	method: "on",
	// 	ioName: "connect_error",
	// }),
	new EventGenerator({
		isAuthRequired: false,
		method: "on",
		ioName: "ping",
	}),
	// new EventGenerator({
	// 	isAuthRequired: false,
	// 	method: "on",
	// 	ioName: "pong",
	// }),
	new EventGenerator({
		isAuthRequired: false,
		method: "on",
		ioName: "disconnect",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getChatInfo",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getClientStatus",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getContacts",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getOnlineClients",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getPrivateChat",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getPrivateChats",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getPublicData",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "getUserInfo",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "join",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "logout",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "removeBlock",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "removeContact",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "sendMessage",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "updateAvatar",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "updateContact",
	}),
	new EventGenerator({
		isAuthRequired: true,
		method: "on",
		ioName: "updatePublicData",
	}),
] as const;

export type SocketEvents = typeof socketEvents;
