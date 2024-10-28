import { HTTPMethod, PickFromUnion } from "@repo/types";
import { ZodSchema } from "zod";

import { IOCollection, IOName, ioCollection } from "../schema/api/io";

export type HTTPRootPath = "auth" | "user" | "private-chat" | "stuff";

export type RouteName = PickFromUnion<
	IOName,
	| "createNewUser"
	| "getAvatar"
	| "getCountries"
	| "getUserInfo"
	| "getWelcomeMessage"
	| "logout"
	| "signIn"
	| "userFcm"
	| "verify"
>;

export type RouteSchema<
	T extends RouteName,
	Pathnames extends ZodSchema | undefined,
	Params extends ZodSchema | undefined,
> = {
	io: IOCollection[T];
	ioName: T;
	isAuthRequired: boolean;
	method: HTTPMethod;
	params?: Params;
	pathname: string;
	pathnames?: Pathnames;
	rootPath: HTTPRootPath;
	statusCode?: number;
};

export class RouteGenerator<
	T extends RouteName,
	Pathnames extends ZodSchema | undefined,
	Params extends ZodSchema | undefined,
> {
	// TODO: Remove `statusCode` part
	public schema: RouteSchema<T, Pathnames, Params> & { statusCode: number };

	constructor(schema: Omit<RouteSchema<T, Pathnames, Params>, "io">) {
		this.schema = {
			statusCode: 200,
			...schema,
			io: ioCollection[schema.ioName],
		};
	}
}
