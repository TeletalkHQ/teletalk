import { ZodSchema } from "zod";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "./fieldWithController";

interface Props<T extends ZodSchema>
	extends FieldWithValidatorWithOptionalNameProps<T> {}

export const Name = <T extends ZodSchema>(props: Props<T>) => (
	<FieldWithController hiddenLabel name="name" placeholder="Name" {...props} />
);
