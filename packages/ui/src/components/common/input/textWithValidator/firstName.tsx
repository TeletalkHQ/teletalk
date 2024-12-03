import { ZodSchema } from "zod";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

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
