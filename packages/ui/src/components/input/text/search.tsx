import type { ZodSchema } from "zod";

import type { FieldWithValidatorWithOptionalNameProps } from "./fieldWithController";
import { TextField } from "./textField";

type Props<T extends ZodSchema> = FieldWithValidatorWithOptionalNameProps<T>;

export const Search = <T extends ZodSchema>({
	placeholder,
	...rest
}: Props<T>) => {
	return (
		<TextField
			autoComplete="off"
			hiddenLabel
			name="search"
			placeholder={placeholder || "Search"}
			{...rest}
		/>
	);
};
