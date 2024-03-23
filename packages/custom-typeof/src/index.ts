interface Types {
	isArray: boolean;
	isBoolean: boolean;
	isFunction: boolean;
	isNaN: boolean;
	isNull: boolean;
	isNumber: boolean;
	isObject: boolean;
	isObjectNative: boolean;
	isString: boolean;
	isStringNumber: boolean;
	isUndefined: boolean;

	isNotArray: boolean;
	isNotBoolean: boolean;
	isNotFunction: boolean;
	isNotNaN: boolean;
	isNotNull: boolean;
	isNotNumber: boolean;
	isNotObject: boolean;
	isNotObjectNative: boolean;
	isNotString: boolean;
	isNotStringNumber: boolean;
	isNotUndefined: boolean;
	[prop: string]: boolean;
}

class CustomTypeof {
	constructor() {
		this.check = this.check.bind(this);
	}

	private isEveryTypeCheckTrue(items: unknown[], type: string) {
		if (!items.length) return false;
		return items.every((value) => typeof value === type);
	}
	private isEveryTypeCheckFalse(items: unknown[], type: string) {
		if (!items.length) return false;
		return items.every((value) => typeof value !== type);
	}

	private changeType<T extends Types>(types: T, key: string) {
		return types[key];
	}

	private getTypesWithFalseValues(): Types {
		return {
			isArray: false,
			isBoolean: false,
			isFunction: false,
			isNaN: false,
			isNull: false,
			isNumber: false,
			isObject: false,
			isObjectNative: false,
			isString: false,
			isStringNumber: false,
			isUndefined: false,

			isNotArray: true,
			isNotBoolean: true,
			isNotFunction: true,
			isNotNaN: true,
			isNotNull: true,
			isNotNumber: true,
			isNotObject: true,
			isNotObjectNative: true,
			isNotString: true,
			isNotStringNumber: true,
			isNotUndefined: true,
		};
	}

	private typeUpperFirst(type: string) {
		const typeParts = type.split("");
		typeParts[0] = typeParts[0].toUpperCase();
		return typeParts.join("");
	}
	check(value: unknown) {
		const types = this.getTypesWithFalseValues();

		if (typeof value !== "number" || isNaN(value)) {
			types.isNaN = true;
			types.isNotNaN = false;
		} else {
			types.isStringNumber = true;
			types.isNotStringNumber = false;
		}

		if (this.isArray(value)) {
			types.isArray = true;
			types.isNotArray = false;
		} else if (this.isNull(value)) {
			types.isNull = true;
			types.isNotNull = false;
		} else {
			const uppercaseType = this.typeUpperFirst(typeof value);
			this.changeType(types, `is${uppercaseType}`);
			this.changeType(types, `isNot${uppercaseType}`);
		}

		return { type: types, isTruthy: !!value };
	}

	isNull(...items: unknown[]) {
		return items.every((value) => value === null);
	}
	isNotNull(...items: unknown[]) {
		return items.every((value) => value !== null);
	}

	isArray(...items: unknown[]) {
		if (!items.length) return false;
		return items.every((value) => Array.isArray(value));
	}

	isNotArray(...items: unknown[]) {
		if (!items.length) return false;
		return items.every((value) => !Array.isArray(value));
	}
	isSomeArray(...items: unknown[]) {
		return items.some((item) => Array.isArray(item));
	}

	isFunction(...items: unknown[]) {
		return this.isEveryTypeCheckTrue(items, "function");
	}
	isNotFunction(...items: unknown[]) {
		return this.isEveryTypeCheckFalse(items, "function");
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	isNumber(...items: any[]) {
		return (
			this.isEveryTypeCheckTrue(items, "number") &&
			!items.some((item) => isNaN(item))
		);
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	isNotNumber(...items: any[]) {
		return !this.isNumber(...items);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	isStringNumber(...items: any[]) {
		if (!items.length) return false;
		return items.every(
			(item) =>
				this.isString(item) && typeof +item === "number" && !isNaN(+item)
		);
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	isNotStringNumber(...items: any[]) {
		if (!items.length) return false;

		const itemsFilteredFromNonString = items.filter(
			(item) => typeof item === "string"
		);

		if (!itemsFilteredFromNonString.length) return true;

		return itemsFilteredFromNonString.every(
			(item) => (typeof +item === "number" && isNaN(+item)) || item === ""
		);
	}

	isBoolean(...items: unknown[]) {
		return this.isEveryTypeCheckTrue(items, "boolean");
	}
	isNotBoolean(...items: unknown[]) {
		return this.isEveryTypeCheckFalse(items, "boolean");
	}

	isTruthy(...items: unknown[]) {
		if (!items.length) return false;
		return items.every((item) => !!item === true);
	}
	isFalsy(...items: unknown[]) {
		if (!items.length) return false;
		return items.every((item) => !!item === false);
	}

	isObject(...items: unknown[]) {
		if (this.isSomeArray(...items)) return false;

		return (
			!!this.isNotNull(...items) && this.isEveryTypeCheckTrue(items, "object")
		);
	}
	isObjectNative(...items: unknown[]) {
		return this.isEveryTypeCheckTrue(items, "object");
	}
	isNotObject(...items: unknown[]) {
		const itemsFilteredFromArray = items.filter((item) => !Array.isArray(item));
		const itemsFilteredFromNull = itemsFilteredFromArray.filter(
			(item) => item !== null
		);

		return itemsFilteredFromNull.length
			? this.isEveryTypeCheckFalse(itemsFilteredFromNull, "object")
			: true;
	}
	isNotObjectNative(...items: unknown[]) {
		return this.isEveryTypeCheckFalse(items, "object");
	}

	isString(...items: unknown[]) {
		return this.isEveryTypeCheckTrue(items, "string");
	}
	isNotString(...items: unknown[]) {
		return this.isEveryTypeCheckFalse(items, "string");
	}

	isUndefined(...items: unknown[]) {
		return this.isEveryTypeCheckTrue(items, "undefined");
	}
	isNotUndefined(...items: unknown[]) {
		return this.isEveryTypeCheckFalse(items, "undefined");
	}
}

const customTypeof = new CustomTypeof();

export { customTypeof, CustomTypeof };
