import { FormSchemaName } from "@repo/schema";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
	Span,
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
			startAdornment: <Span>+</Span>,
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
