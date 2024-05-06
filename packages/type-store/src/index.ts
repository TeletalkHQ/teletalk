export type SnakeCase<S extends string> = S extends `${infer T1}_${infer T2}`
	? `${SnakeCase<T1>}_${SnakeCase<T2>}`
	: S extends `${infer T1}${infer T2}`
		? `${Lowercase<T1>}${SnakeCase<T2>}`
		: S;

export type CamelCase<S extends string> =
	S extends `${infer P1}_${infer P2}${infer P3}`
		? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
		: Lowercase<S>;

export type KeysToCamelCase<T> = {
	[K in keyof T as CamelCase<string & K>]: T[K];
};

export type CamelToSnakeCase<S extends string> =
	S extends `${infer T}${infer U}`
		? `${T extends Capitalize<T>
				? "_"
				: ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
		: S;

export type KeysToSnakeCase<T> = {
	[K in keyof T as CamelToSnakeCase<string & K>]: T[K];
};

export interface StringMap {
	[prop: string | symbol]: any;
}

export type PromiseVoidNoArgsFn = () => Promise<void>;

export type VoidNoArgsFn = () => void;

export type VoidWithArg<Arg> = (arg: Arg) => void;

export type VoidWithTwoArgs<Arg1, Arg2> = (arg1: Arg1, arg2: Arg2) => void;

export * from "./api";
export * from "./components";
export * from "./datatype";
