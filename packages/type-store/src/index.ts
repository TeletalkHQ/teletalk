export interface StringMap {
	[key: string]: any;
}

export type SnakeCase<S extends string> = S extends `${infer T1}_${infer T2}`
	? `${SnakeCase<T1>}_${SnakeCase<T2>}`
	: S extends `${infer T1}${infer T2}`
		? `${Lowercase<T1>}${SnakeCase<T2>}`
		: S;

export * from "./api";
export * from "./components";
export * from "./datatype";
