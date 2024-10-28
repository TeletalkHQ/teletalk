import { BaseSchemaName } from "@repo/schema";

import {
	FieldWithValidatorWithOptionalNameProps,
	TextField,
} from "../../../base";

type Props<Name extends BaseSchemaName> =
	FieldWithValidatorWithOptionalNameProps<Name>;

export const Search = <Name extends BaseSchemaName>({
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
