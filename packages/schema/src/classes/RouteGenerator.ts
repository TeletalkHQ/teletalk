import { HTTPMethod } from "@repo/types";

import { IOName, ioCollection } from "../schema";

export type HTTPRootPath = "auth" | "user" | "private-chat" | "stuff";

export type RouteSchema<T extends IOName> = {
	io: (typeof ioCollection)[T];
	ioName: T;
	isAuthRequired: boolean;
	method: HTTPMethod;
	pathname: string;
	rootPath: HTTPRootPath;
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
