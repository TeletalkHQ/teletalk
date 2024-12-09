import { TextField as TextFieldMui, type TextFieldProps } from "@mui/material";

import { type ElementLabel } from "../../../types";

export type FieldInputBaseProps = TextFieldProps & {
	id?: string;
	label?: ElementLabel;
	m?: TextFieldProps["margin"];
	name: string;
	placeholder?: ElementLabel;
};

export type FieldInputBasePropsWithOptionalName = Omit<
	FieldInputBaseProps,
	"name"
> & {
	name?: string;
};

export const TextField: React.FC<FieldInputBaseProps> = ({
	autoComplete,
	m,
	margin,
	name,
	...rest
}: FieldInputBaseProps) => {
	const fixedAutoComplete =
		autoComplete === "off" ? "one-time-code" : autoComplete;

	return (
		<TextFieldMui
			autoComplete={fixedAutoComplete}
			fullWidth
			margin={m || margin}
			{...rest}
		/>
	);
};
