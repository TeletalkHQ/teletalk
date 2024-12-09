import type { ZodSchema } from "zod";

import type {
	FieldWithValidatorWithOptionalNameProps } from "./fieldWithController";
import {
	FieldWithController
} from "./fieldWithController";

interface Props<T extends ZodSchema>
	extends FieldWithValidatorWithOptionalNameProps<T> {}

export const Email = <T extends ZodSchema>(props: Props<T>) => (
	<FieldWithController
		hiddenLabel
		name="email"
		placeholder="Email"
		{...props}
	/>
);
