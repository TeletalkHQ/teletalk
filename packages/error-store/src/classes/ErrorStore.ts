import { ErrorReason, NativeError } from "../types";
import { errors } from "../variables";
import { modelErrorBuilder } from "./ModelErrorBuilder";

class ErrorStore {
	private errors: NativeError[] = [];

	constructor() {
		this.build();
	}

	find(reason: ErrorReason) {
		return this.errors.find((i) => i.reason === reason)!;
	}

	getAll() {
		return this.errors;
	}

	private build() {
		this.errors = [...modelErrorBuilder().build(), ...errors.custom];

		//TODO: add `isAuthError` to wherever is required
		// this.errors.forEach((item) => {
		// 	if (item.reason.startsWith("SESSION_")) {
		// 		item.isAuthError = true;
		// 	}
		// });
	}
}

export const errorStore = new ErrorStore();
