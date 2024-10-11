import { InternalServerErrorException } from "@nestjs/common";
import { ZodString } from "zod";

import { HTTPRootPath } from "../classes";
import { HTTPRouteShortName, httpRoutes } from "../schema";

export const getStringMaxLength = <T extends ZodString>(schema: T) => {
	const result = schema._def.checks.find((item) => item.kind === "max")?.value;

	if (!result) throw new InternalServerErrorException("INVALID_SCHEMA");

	return result;
};

export const findHttpRoute = (name: HTTPRouteShortName) => {
	const foundRoute = httpRoutes.find((item) => item.schema.ioName === name);

	if (!foundRoute)
		throw new InternalServerErrorException("http route not found");

	return foundRoute;
};

export const getPathname = (name: HTTPRouteShortName) => {
	return findHttpRoute(name).schema.pathname;
};

export const getRootPath = (name: HTTPRootPath) => {
	return name;
};
