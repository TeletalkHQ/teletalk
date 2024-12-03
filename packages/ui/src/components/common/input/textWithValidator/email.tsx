import { ZodSchema } from "zod";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

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
