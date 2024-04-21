import { ValidatorFnType } from "@repo/validator";

export interface Route {
	inputValidator?: ValidatorFnType;
	outputValidator?: ValidatorFnType;
	isAuthRequired: boolean;
}

export * from "./socket";
