import { SocketMethods } from "../../../socket/src/types";
import { ioCollection } from "../schema";

export type EventName =
	| "addBlock"
	| "addContactWithCellphone"
	// | "addContactWithUserId"
	| "createNewUser"
	| "disconnect"
	| "getChatInfo"
	| "getContacts"
	| "getCountries"
	| "getClientStatus"
	| "getOnlineClients"
	| "getPrivateChat"
	| "getPrivateChats"
	| "getPublicData"
	| "getStuff"
	| "getUserData"
	| "getWelcomeMessage"
	| "join"
	| "logout"
	| "ping"
	// | "pong"
	| "removeBlock"
	| "removeContact"
	| "sendMessage"
	| "signIn"
	| "updateAvatar"
	| "updateContact"
	| "updatePublicData"
	| "getAvatar"
	| "verify";

export type EventSchema<T extends EventName> = {
	name: T;
	isAuthRequired: boolean;
	method: SocketMethods;
	io: (typeof ioCollection)[T];
};

export class EventSchemaGenerator<T extends EventName> {
	public schema: EventSchema<T>;

	constructor(schema: Omit<EventSchema<T>, "io">) {
		this.schema = {
			...schema,
			io: ioCollection[schema.name],
		};
	}
}
