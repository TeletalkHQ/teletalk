import { ZodSchema } from "zod";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

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
