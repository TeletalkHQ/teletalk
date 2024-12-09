import type { ZodSchema } from "zod";

import type {
	FieldWithValidatorWithOptionalNameProps } from "./fieldWithController";
import {
	FieldWithController
} from "./fieldWithController";

interface Props<T extends ZodSchema>
	extends FieldWithValidatorWithOptionalNameProps<T> {}

export const FirstName = <T extends ZodSchema>(props: Props<T>) => {
	return (
		<FieldWithController
			id="firstName"
			label="First Name"
			name="firstName"
			{...props}
		/>
	);
};
