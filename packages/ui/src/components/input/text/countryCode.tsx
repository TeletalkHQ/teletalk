import type { ZodSchema } from "zod";

import { Span } from "../../box/span";
import type {
	FieldWithValidatorWithOptionalNameProps } from "./fieldWithController";
import {
	FieldWithController
} from "./fieldWithController";

interface Props<T extends ZodSchema>
	extends FieldWithValidatorWithOptionalNameProps<T> {}

export const CountryCode = <T extends ZodSchema>({
	style,
	...rest
}: Props<T>) => (
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
