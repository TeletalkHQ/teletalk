import { HTTPMethod } from "@repo/types";

import { IOName, ioCollection } from "../schema";

export type RouteSchema<T extends IOName> = {
	ioName: T;
	isAuthRequired: boolean;
	method: HTTPMethod;
	io: (typeof ioCollection)[T];
	pathname: string;
	rootPath: "auth" | "user" | "private-chat" | "stuff";
};

export class RouteGenerator<T extends IOName> {
	public schema: RouteSchema<T>;

	constructor(schema: Omit<RouteSchema<T>, "io">) {
		this.schema = {
			...schema,
			io: ioCollection[schema.ioName],
		};
	}
}
