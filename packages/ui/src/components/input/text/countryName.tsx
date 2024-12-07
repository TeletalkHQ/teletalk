import { ZodSchema } from "zod";

import { Span } from "../../box/span";
import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "./fieldWithController";

interface Props<T extends ZodSchema>
	extends FieldWithValidatorWithOptionalNameProps<T> {}

export const CountryName = <T extends ZodSchema>({
	style,
	...rest
}: Props<T>) => (
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
