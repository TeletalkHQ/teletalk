import { FormSchemaName } from "@repo/schema";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
	Span,
} from "../../../base";

interface Props<Name extends FormSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const CountryCode = <Name extends FormSchemaName>({
	style,
	...rest
}: Props<Name>) => (
	<FieldWithController
		autoComplete="tel-country-code"
		InputProps={{
			startAdornment: <Span>+</Span>,
		}}
		name="countryCode"
		placeholder="Code"
		style={{
			width: "100px",
			...style,
		}}
		{...rest}
	/>
);
