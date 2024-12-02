export type StringMap = Record<string, any>;

export type VoidNoArgs = () => void;

export type VoidWithArg<Arg> = (arg: Arg) => void;

export * from "./string";
export * from "./ui";
