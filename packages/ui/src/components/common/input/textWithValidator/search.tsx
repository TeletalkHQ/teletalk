import { BaseSchemaName } from "@repo/schema";

import { Field, FieldWithValidatorWithOptionalNameProps } from "../../../base";

type Props<Name extends BaseSchemaName> =
	FieldWithValidatorWithOptionalNameProps<Name>;

export const Search = <Name extends BaseSchemaName>({
	placeholder,
	...rest
}: Props<Name>) => {
	return (
		<Field
			autoComplete="off"
			hiddenLabel
			name="search"
			placeholder={placeholder || "Search"}
			required
			{...rest}
		/>
	);
};
