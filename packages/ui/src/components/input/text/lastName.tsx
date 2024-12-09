import type { ZodSchema } from "zod";

import type {
	FieldWithValidatorWithOptionalNameProps } from "./fieldWithController";
import {
	FieldWithController
} from "./fieldWithController";

interface Props<T extends ZodSchema>
	extends FieldWithValidatorWithOptionalNameProps<T> {}

export const LastName = <T extends ZodSchema>(props: Props<T>) => {
	return (
		<FieldWithController
			id="lastName"
			label="Last Name"
			name="lastName"
			{...props}
		/>
	);
};
