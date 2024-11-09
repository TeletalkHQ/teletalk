import { TextField as TextInput } from "./base";
import { LoadingButton } from "./base/button";

export const Button = LoadingButton;

export const Field = {
	Base: TextInput,
};

export * from "./base";
export * from "./icon";
export * from "./common";
export * from "./template";
