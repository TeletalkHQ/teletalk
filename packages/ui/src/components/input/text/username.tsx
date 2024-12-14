import type { ZodSchema } from "zod";

import {
	FieldWithController,
	type FieldWithValidatorWithOptionalNameProps,
} from "./fieldWithController";

interface Props<T extends ZodSchema>
	extends FieldWithValidatorWithOptionalNameProps<T> {}

export const Username = <T extends ZodSchema>(props: Props<T>) => {
	return (
		<FieldWithController
			id="username"
			label="Username"
			name="username"
			{...props}
		/>
	);
};
