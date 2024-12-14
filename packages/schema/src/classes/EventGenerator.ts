import { type PickFromUnion } from "@repo/types";

import { type IOName, type IOSchema } from "../schema";

export type EventName = PickFromUnion<
	IOName,
	| "addBlock"
	| "addContactById"
	| "addContactByPhone"
	| "connect"
	| "connect_error"
	| "disconnect"
	| "getChatInfo"
	| "getClientStatus"
	| "getContacts"
	| "getOnePrivateChat"
	| "getOnlineClients"
	| "getPrivateChats"
	| "ping"
	| "pong"
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
