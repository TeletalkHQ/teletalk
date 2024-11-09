import { FormSchemaName } from "@repo/schema";

import {
	Box,
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

interface Props<Name extends FormSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const CountryName = <Name extends FormSchemaName>({
	style,
	...rest
}: Props<Name>) => (
	<FieldWithController
		autoComplete="tel-country-code"
		InputProps={{
			startAdornment: <Box.Span>+</Box.Span>,
		}}
		name="countryName"
		placeholder="Country Name"
		style={{
			width: "100px",
			...style,
		}}
		{...rest}
	/>
);
