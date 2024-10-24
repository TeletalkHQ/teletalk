import { BaseSchemaName } from "@repo/schema";

import {
	Box,
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

interface Props<Name extends BaseSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const CountryCode = <Name extends BaseSchemaName>({
	style,
	...rest
}: Props<Name>) => (
	<FieldWithController
		autoComplete="tel-country-code"
		InputProps={{
			startAdornment: <Box.Span>+</Box.Span>,
		}}
		name="countryCode"
		placeholder="Code"
		required
		style={{
			width: "100px",
			...style,
		}}
		{...rest}
	/>
);
