import { StringMap } from "@repo/type-store";

interface FilterFields {
	[key: string]: any | FilterFields | FilterFields[];
}

class ObjectUtils {
	constructor() {
		this.excludeProps = this.excludeProps.bind(this);
		this.excludePropsPeerToPeer = this.excludePropsPeerToPeer.bind(this);
	}

	excludePropsPeerToPeer<T>(data: StringMap, filterFields: FilterFields): T {
		return Object.entries(filterFields).reduce(
			(prevValue: StringMap, [kye, filterFieldValue]) => {
				const objectFieldValue = data[kye];
				if (typeof filterFieldValue === "object" && filterFieldValue !== null) {
					prevValue[kye] = this.excludePropsPeerToPeer(
						objectFieldValue,
						filterFieldValue
					);
					return prevValue;
				}

				if (Array.isArray(filterFieldValue)) {
					prevValue[kye] = objectFieldValue.map((v: StringMap) =>
						this.excludePropsPeerToPeer(v, filterFieldValue[0] as any)
					);
					return prevValue;
				}

				prevValue[kye] = objectFieldValue;
				return prevValue;
			},
			{}
		) as T;
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

	clarify(dirtyObject: StringMap) {
		return Object.entries(dirtyObject).reduce(
			(prevValue: StringMap, [key, value]) => {
				if (typeof value !== "undefined") {
					if (
						typeof dirtyObject[key] === "object" &&
						dirtyObject[key] !== null
					) {
						prevValue[key] = this.clarify(dirtyObject[key]);

						return prevValue;
					}

					if (Array.isArray(dirtyObject[key])) {
						prevValue[key] = dirtyObject[key].map((item: StringMap) =>
							this.clarify(item)
						);

						return prevValue;
					}

					prevValue[key] = value;
				}

				return prevValue;
			},
			{}
		);
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

// const assigner = (imports, path, value) => {
// 	const newPath = pathSplitter(path);

// 	const lastKeyIndex = newPath.length - 1;

// 	for (var i = 0; i < lastKeyIndex; ++i) {
// 		const key = newPath[i];
// 		if (!(key in imports)) {
// 			imports[key] = {};
// 		}
// 		imports = imports[key];
// 	}

// 	imports[newPath[lastKeyIndex]] = {
// 		...imports[newPath[lastKeyIndex]],
// 		...value,
// 	};
// };
