import { type PickFromUnion } from "@repo/types";
import type { ZodUndefined, z } from "zod";

import { type IOName, type IOSchema } from "../schema/api/io";

export type HTTPRootPath =
	| "auth"
	| "private-chat"
	| "server-info"
	| "stuff"
	| "user";

export type RouteName = PickFromUnion<
	IOName,
	| "createNewUser"
	| "getAvatar"
	| "getCountries"
	| "getUserInfo"
	| "getWelcomeMessage"
	| "logout"
	| "ping"
	| "signIn"
	| "userFcm"
	| "verify"
>;

export type EndPoint<T extends IOSchema["pathnames"]> = T extends ZodUndefined
	? string
	: (pathnames: z.infer<T>) => string;

export type HTTPMethod = "delete" | "get" | "post" | "patch" | "put";

export type RouteSchema<
	T extends IOSchema = IOSchema,
	U extends RouteName = RouteName,
> = {
	io: T;
	ioName: U;
	isAuthRequired: boolean;
	method: HTTPMethod;
	statusCode?: number;
	endpoint: `${HTTPRootPath}/${string}`;
};

export class RouteGenerator<
	T extends IOSchema = IOSchema,
	U extends RouteName = RouteName,
> {
	// TODO: Remove `statusCode` part
	public schema: RouteSchema<T, U> & { statusCode: number };

	constructor(schema: RouteSchema<T, U>) {
		this.schema = {
			statusCode: 200,
			...schema,
		};
	}
}
