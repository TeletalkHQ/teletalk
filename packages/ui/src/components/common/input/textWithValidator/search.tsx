import { FormSchemaName } from "@repo/schema";

import {
	FieldWithValidatorWithOptionalNameProps,
	TextField,
} from "../../../base";

type Props<Name extends FormSchemaName> =
	FieldWithValidatorWithOptionalNameProps<Name>;

export const Search = <Name extends FormSchemaName>({
	placeholder,
	...rest
}: Props<Name>) => {
	return (
		<TextField
			autoComplete="off"
			hiddenLabel
			name="search"
			placeholder={placeholder || "Search"}
			required
			{...rest}
		/>
	);
};
