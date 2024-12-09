import { InternalServerErrorException, RequestMethod } from "@nestjs/common";
import type { ZodString } from "zod";
import { type ZodTypeAny, z } from "zod";

import { type EventName, type HTTPMethod, type HTTPRootPath } from "../classes";
import { type HTTPRouteName, httpRoutes, socketEvents } from "../schema";

export const getStringSchemaMaxLength = <T extends ZodString>(schema: T) => {
	const result = schema._def.checks.find((item) => item.kind === "max")?.value;

	if (!result) throw new InternalServerErrorException("INVALID_SCHEMA");

	return result;
};
export const getStringSchemaMinLength = <T extends ZodString>(schema: T) => {
	const result = schema._def.checks.find((item) => item.kind === "min")?.value;

	if (!result) throw new InternalServerErrorException("INVALID_SCHEMA");

	return result;
};
export const getStringSchemaLength = <T extends ZodString>(schema: T) => {
	const result = schema._def.checks.find(
		(item) => item.kind === "length"
	)?.value;

	if (!result) throw new InternalServerErrorException("INVALID_SCHEMA");

	return result;
};

export const getSchemaType = (schema: ZodTypeAny): string => {
	if (schema instanceof z.ZodString) return "string";
	if (schema instanceof z.ZodNumber) return "number";
	if (schema instanceof z.ZodBoolean) return "boolean";
	if (schema instanceof z.ZodArray) return "array";
	if (schema instanceof z.ZodObject) return "object";
	if (schema instanceof z.ZodLiteral) return "literal";
	if (schema instanceof z.ZodEnum) return "enum";
	if (schema instanceof z.ZodOptional)
		return `optional(${getSchemaType(schema.unwrap())})`;
	if (schema instanceof z.ZodNullable)
		return `nullable(${getSchemaType(schema.unwrap())})`;

	return "unknown";
};

export const findHttpRouteByUrl = (url: string) => {
	return Object.values(httpRoutes).find((item) => {
		return url === item.schema.endpoint || url === `/${item.schema.endpoint}`;
	});
};

export const findHttpRoute = <T extends HTTPRouteName>(name: T) => {
	return httpRoutes[name];
};

export const findEvent = <T extends EventName>(name: T) => {
	return socketEvents[name];
};

export const getEventName = <T extends EventName>(name: T) => {
	const foundEvent = findEvent(name);
	return foundEvent.schema.ioName;
};

export const getPathname = (name: HTTPRouteName) => {
	return findHttpRoute(name).schema.endpoint.split("/")[1];
};

export const getRootName = (name: HTTPRouteName) => {
	return findHttpRoute(name).schema.endpoint.split("/")[0];
};

export const getRootPath = (name: HTTPRootPath) => {
	return name;
};

export const getFullPath = (name: HTTPRouteName) => {
	return `${getRootName(name)}/${getPathname(name)}`;
};

export const getRequestMethod = (name: HTTPRouteName) => {
	const method = getMethod(name);

	return fixedMethodForNest[method];
};
const fixedMethodForNest = {
	delete: RequestMethod.DELETE,
	get: RequestMethod.GET,
	patch: RequestMethod.PATCH,
	post: RequestMethod.POST,
	put: RequestMethod.PUT,
} satisfies Record<HTTPMethod, RequestMethod>;

export const getMethod = (name: HTTPRouteName) => {
	return findHttpRoute(name).schema.method;
};

// TODO: Move to global utils
export const parseToInt = (val: string) => parseInt(val);
