import { SocketMethods } from "@repo/types";

import { IOName, ioCollection } from "../schema";

export type EventSchema<T extends IOName> = {
	ioName: T;
	isAuthRequired: boolean;
	method: SocketMethods;
	io: (typeof ioCollection)[T];
};

export class EventGenerator<T extends IOName> {
	public schema: EventSchema<T>;

	constructor(schema: Omit<EventSchema<T>, "io">) {
		this.schema = {
			...schema,
			io: ioCollection[schema.ioName],
		};
	}
}
