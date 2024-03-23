import { customTypeof } from "custom-typeof";

import { FieldType, FieldValueType, IoField } from "../types";

export class IoFieldMaker {
	private field: IoField;

	constructor() {
		this.field = {
			required: true,
			type: "object",
		};
	}

	type(type: FieldType) {
		this.field.type = type;
		return this;
	}

	value(value: FieldValueType) {
		this.field.value = value;
		return this;
	}

	required(required = true) {
		this.field.required = required;
		return this;
	}

	optional() {
		this.field.required = false;
		return this;
	}

	build(): IoField {
		if (customTypeof.isUndefined(this.field.value)) {
			const { value, ...rest } = this.field;
			return rest;
		}
		return this.field;
	}
}

export const ioFieldMaker = () => new IoFieldMaker();
