import { SocketMethods } from "../../../socket/src/types";
import { EventShortName, socketIOCollection } from "../schema";

export type EventSchema<T extends EventShortName> = {
	name: T;
	isAuthRequired: boolean;
	method: SocketMethods;
	io: (typeof socketIOCollection)[T];
};

export class EventSchemaGenerator<T extends EventShortName> {
	public schema: EventSchema<T>;

	constructor(schema: Omit<EventSchema<T>, "io">) {
		this.schema = {
			...schema,
			io: socketIOCollection[schema.name],
		};
	}
}
