import { InternalServerErrorException } from "@nestjs/common";
import { ZodString } from "zod";

import { HTTPRootPath } from "../classes";
import { HTTPRouteShortName, httpRoutes } from "../schema";

export const getZodStringMaxLength = <T extends ZodString>(schema: T) => {
	return schema._def.checks.find((item) => item.kind === "max")!.value;
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
