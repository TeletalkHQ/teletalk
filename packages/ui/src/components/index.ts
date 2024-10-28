import { TextField as TextInput } from "./base";
import { LoadingButton } from "./base/button";
import { TextWithValidator } from "./common";

export const Button = LoadingButton;

export const Field = {
	...TextWithValidator,
	Base: TextInput,
};

export * from "./base";
export * from "./common";
export * from "./template";
