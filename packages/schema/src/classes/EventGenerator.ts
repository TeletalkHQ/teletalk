import { PickFromUnion, SocketMethods } from "@repo/types";

import { IOName, ioCollection } from "../schema";

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

export type EventSchema<T extends EventName> = {
	ioName: T;
	namespace: string;
	isAuthRequired: boolean;
	method: SocketMethods;
	io: (typeof ioCollection)[T];
};

type _Schema<T extends EventName> = {
	ioName: T;
	namespace?: string;
	isAuthRequired: boolean;
	method: SocketMethods;
};

export class EventGenerator<T extends EventName> {
	public schema: EventSchema<T>;

	constructor(schema: _Schema<T>) {
		this.schema = {
			...schema,
			namespace: schema.namespace || "",
			io: ioCollection[schema.ioName],
		};
	}
}
