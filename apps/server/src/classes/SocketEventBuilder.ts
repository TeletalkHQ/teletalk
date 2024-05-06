import { errorStore } from "@repo/error-store";
import { SocketEvent } from "@repo/hl-types";
import { EventName } from "@repo/type-store";

import { RouteBuilder } from "~/classes/RouteBuilder";

export class SocketEventBuilder<T extends EventName> extends RouteBuilder {
	protected route: SocketEvent<T>;

	constructor() {
		super();

		// @ts-ignore
		this.route = {
			method: "customOn",
			isAuthRequired: true,
		};
	}

	noAuth() {
		this.route.isAuthRequired = false;
		return this;
	}

	method(method: (typeof this.route)["method"]) {
		this.route.method = method;
		return this;
	}

	name(name: (typeof this.route)["name"]) {
		this.route.name = name;
		return this;
	}

	handler(handler: (typeof this.route)["handler"]) {
		this.route.handler = handler;
		return this;
	}

	build() {
		const { handler, name } = this.route;
		super.checkRequirements(errorStore.find("EVENT_NOT_FOUND"), handler, name);
		return this.route;
	}
}

export const socketEventBuilder = () => ({
	create: <T extends EventName>() => new SocketEventBuilder<T>(),
});
