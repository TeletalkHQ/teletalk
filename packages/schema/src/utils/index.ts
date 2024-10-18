import { InternalServerErrorException, RequestMethod } from "@nestjs/common";
import { HTTPMethod } from "@repo/types";
import { ZodString, ZodTypeAny, z } from "zod";

import { HTTPRootPath, RouteGenerator } from "../classes";
import { HTTPRouteShortName, httpRoutes } from "../schema";

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

export const findHttpRoute = <T extends HTTPRouteShortName>(name: T) => {
	const foundRoute = httpRoutes.find((item) => item.schema.ioName === name);

	if (!foundRoute)
		throw new InternalServerErrorException("http route not found");

	return foundRoute as RouteGenerator<T>;
};

export const getPathname = (name: HTTPRouteShortName) => {
	return findHttpRoute(name).schema.pathname;
};

export const getRootName = (name: HTTPRouteShortName) => {
	return findHttpRoute(name).schema.rootPath;
};

export const getRootPath = (name: HTTPRootPath) => {
	return name;
};

export const getFullPath = (name: HTTPRouteShortName) => {
	return `${getRootName(name)}/${getPathname(name)}`;
};

export const getRequestMethod = (name: HTTPRouteShortName) => {
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

export const getMethod = (name: HTTPRouteShortName) => {
	return findHttpRoute(name).schema.method;
};

// TODO: Move to global utils
export const parseToInt = (val: string) => parseInt(val);
