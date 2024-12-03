import { PickFromUnion } from "@repo/types";

import { IOName, IOSchema } from "../schema";

export type EventName = PickFromUnion<
	IOName,
	| "addContact"
	| "addBlock"
	| "connect"
	| "connect_error"
	| "ping"
	| "pong"
	| "disconnect"
	| "getChatInfo"
	| "getClientStatus"
	| "getContacts"
	| "getOnlineClients"
	| "getOnePrivateChat"
	| "getPrivateChats"
	| "getUserPublicInfo"
	| "getUserInfo"
	| "join"
	| "logout"
	| "removeBlock"
	| "removeContact"
	| "sendMessage"
	| "updateAvatar"
	| "updateContact"
	| "updateUserPublicInfo"
>;

export type SocketMethods = "on" | "onAny" | "once";

export type EventSchema<
	T extends IOSchema = IOSchema,
	U extends EventName = EventName,
> = {
	ioName: U;
	namespace: string;
	isAuthRequired: boolean;
	method: SocketMethods;
	io: T;
};

export class EventGenerator<
	T extends IOSchema = IOSchema,
	U extends EventName = EventName,
> {
	constructor(public schema: EventSchema<T, U>) {}
}
