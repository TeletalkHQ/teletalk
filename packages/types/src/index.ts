import { ChangeEventHandler } from "react";

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

export type StringMap = Record<string, any>;

export type VoidNoArgs = () => void;

export type VoidWithArg<Arg> = (arg: Arg) => void;

export type LoadingType = "FULL_PAGE" | "OVERLAY";

export type CommonOnChange = ChangeEventHandler<
	HTMLInputElement | HTMLTextAreaElement
>;

export type PickFromUnion<T, U> = T extends U ? T : never;

export type TransitionName = "Grow" | "Slide" | "Zoom";
export type DrawerAnchor = "bottom" | "left" | "right" | "top";
