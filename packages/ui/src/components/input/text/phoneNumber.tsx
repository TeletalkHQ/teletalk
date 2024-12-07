import { ZodSchema } from "zod";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "./fieldWithController";

interface Props<T extends ZodSchema>
	extends FieldWithValidatorWithOptionalNameProps<T> {}

export const PhoneNumber = <T extends ZodSchema>(props: Props<T>) => {
	return (
		<FieldWithController
			autoComplete="off"
			id="phoneNumber"
			name="phoneNumber"
			placeholder="Phone Number"
			{...props}
		/>
	);
};
