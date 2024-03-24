import { ValidatorFnType } from "../validation";

export interface Route {
	inputValidator?: ValidatorFnType;
	outputValidator?: ValidatorFnType;
	isAuthRequired: boolean;
}

export * from "./socket";
