import { HTTPMethod } from "@repo/types";

import { IOCollection, IOName, ioCollection } from "../schema";

export type HTTPRootPath = "auth" | "user" | "private-chat" | "stuff";

export type RouteSchema<T extends IOName> = {
	io: IOCollection[T];
	ioName: T;
	isAuthRequired: boolean;
	method: HTTPMethod;
	pathname: string;
	rootPath: HTTPRootPath;
	statusCode?: number;
};

export class RouteGenerator<T extends IOName> {
	public schema: RouteSchema<T> & { statusCode: number };

	constructor(schema: Omit<RouteSchema<T>, "io">) {
		this.schema = {
			statusCode: 200,
			...schema,
			io: ioCollection[schema.ioName],
		};
	}
}
