import { NativeError } from "@repo/error-store";
import FastestValidator, { ValidationSchema } from "fastest-validator";

import { Route } from "~/types";

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
		const isAllSet = requirements.every(Boolean);

		if (isAllSet) return;

		throw {
			...error,
			route: this.route,
		};
	}
}
