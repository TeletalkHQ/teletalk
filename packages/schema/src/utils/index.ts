import { InternalServerErrorException, RequestMethod } from "@nestjs/common";
import { HTTPMethod } from "@repo/types";
import { ZodString } from "zod";

import { HTTPRootPath, RouteGenerator } from "../classes";
import { HTTPRouteShortName, httpRoutes } from "../schema";

export const getStringMaxLength = <T extends ZodString>(schema: T) => {
	const result = schema._def.checks.find((item) => item.kind === "max")?.value;

	if (!result) throw new InternalServerErrorException("INVALID_SCHEMA");

	return result;
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
