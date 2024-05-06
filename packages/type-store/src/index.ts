export type SnakeCase<S extends string> = S extends `${infer T1}_${infer T2}`
	? `${SnakeCase<T1>}_${SnakeCase<T2>}`
	: S extends `${infer T1}${infer T2}`
		? `${Lowercase<T1>}${SnakeCase<T2>}`
		: S;

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
