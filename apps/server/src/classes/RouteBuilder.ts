import { customTypeof } from "@repo/custom-typeof";
import FastestValidator from "fastest-validator";

import { NativeError, Route, ValidationSchema } from "~/types";

//CLEANME:
export const compiler = new FastestValidator({
	useNewCustomCheckerFunction: true,
});

export abstract class RouteBuilder {
	protected route: Route;

	constructor() {
		//@ts-expect-error //FIXME
		this.route = {};
	}

	inputSchema(inputFields: ValidationSchema) {
		this.route.inputValidator = compiler.compile(inputFields);
		return this;
	}
	outputSchema(outputFields: ValidationSchema) {
		this.route.outputValidator = compiler.compile(outputFields);
		return this;
	}

	build() {
		return this.route;
	}

	checkRequirements(
		error: NativeError | { reason: string },
		...requirements: unknown[]
	) {
		if (customTypeof.isUndefined(...requirements))
			throw {
				...error,
				route: this.route,
			};
	}
}
