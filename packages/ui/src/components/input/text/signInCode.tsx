import type { ZodSchema } from "zod";

import type {
	FieldWithValidatorWithOptionalNameProps } from "./fieldWithController";
import {
	FieldWithController
} from "./fieldWithController";

interface Props<T extends ZodSchema>
	extends FieldWithValidatorWithOptionalNameProps<T> {}

export const SignInCode = <T extends ZodSchema>(props: Props<T>) => {
	return (
		<FieldWithController
			id="signInCode"
			label="Sign In Code"
			name="signInCode"
			{...props}
		/>
	);
};
