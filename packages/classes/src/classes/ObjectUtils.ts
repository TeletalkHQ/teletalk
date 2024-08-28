import { StringMap } from "@repo/types";

class ObjectUtils {
	constructor() {
		this.excludeProps = this.excludeProps.bind(this);
	}

	excludeProps(data: StringMap, props: string[]) {
		return Object.entries(data).reduce((prevValue: StringMap, [key, value]) => {
			if (props.includes(key)) return prevValue;

			if (
				!Array.isArray(value) &&
				typeof value === "object" &&
				value !== null
			) {
				prevValue[key] = this.excludeProps(value, props);
				return prevValue;
			}

			if (Array.isArray(value)) {
				prevValue[key] = value.map((v) => this.excludeProps(v as any, props));
				return prevValue;
			}

			prevValue[key] = value;
			return prevValue;
		}, {});
	}

	rename<T extends StringMap>(object: T, oldKey: string, newKey: string) {
		const { [oldKey as keyof T]: oldKeyValue, ...rest } = object;

		(rest as StringMap)[newKey] = oldKeyValue;
		return rest;
	}

	setPropertyByFirstTruthyValue(
		object: StringMap,
		key: string,
		...values: any[]
	) {
		const truthyValue = values.find(Boolean);

		return {
			...object,
			[key]: truthyValue,
		};
	}
}

const objectUtils = new ObjectUtils();

export { objectUtils, ObjectUtils };
