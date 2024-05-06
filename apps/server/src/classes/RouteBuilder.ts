import { NativeError } from "@repo/error-store";
import { Route } from "@repo/hl-types";
import { models } from "@repo/validator";
import FastestValidator, { ValidationSchema } from "fastest-validator";

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

const validator = compiler.compile({
	phoneNumber: models.validation.phoneNumber,
	lastName: models.validation.lastName,
	// firstName: models.validation.firstName,
	// countryCode: models.validation.countryCode,
	// countryName: models.validation.countryName,
});

const _result = validator({
	phoneNumber: "123123123",
});
