import { EventName } from "@repo/schema";
import { SocketRoute } from "@repo/types";

// UNUSED
export class SocketEventBuilder<T extends EventName> {
	public event: SocketRoute<T>;

	constructor(event: SocketRoute<T>) {
		this.event = event;
	}
}
