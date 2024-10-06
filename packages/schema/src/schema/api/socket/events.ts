import { EventSchemaGenerator } from "../../../classes";

export const eventSchema = [
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "addContactWithCellphone",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "addBlock",
	}),
	// new EventSchemaGenerator({
	// 	isAuthRequired: false,
	// 	method: "on",
	// 	name: "connect",
	// }),
	// new EventSchemaGenerator({
	// 	isAuthRequired: false,
	// 	method: "on",
	// 	name: "connect_error",
	// }),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "createNewUser",
	}),
	new EventSchemaGenerator({
		isAuthRequired: false,
		method: "on",
		name: "disconnect",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "getAvatar",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "getChatInfo",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "getClientStatus",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "getContacts",
	}),
	new EventSchemaGenerator({
		isAuthRequired: false,
		method: "on",
		name: "getCountries",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "getOnlineClients",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "getPrivateChat",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "getPrivateChats",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "getPublicData",
	}),
	new EventSchemaGenerator({
		isAuthRequired: false,
		method: "on",
		name: "getStuff",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "getUserData",
	}),
	new EventSchemaGenerator({
		isAuthRequired: false,
		method: "on",
		name: "getWelcomeMessage",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "join",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "logout",
	}),
	new EventSchemaGenerator({
		isAuthRequired: false,
		method: "on",
		name: "ping",
	}),
	// new EventSchemaGenerator({
	// 	isAuthRequired: false,
	// 	method: "on",
	// 	name: "pong",
	// }),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "removeBlock",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "removeContact",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "sendMessage",
	}),
	new EventSchemaGenerator({
		isAuthRequired: false,
		method: "on",
		name: "signIn",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "updateAvatar",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "updateContact",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "updatePublicData",
	}),
	new EventSchemaGenerator({
		isAuthRequired: true,
		method: "on",
		name: "verify",
	}),
] as const;
