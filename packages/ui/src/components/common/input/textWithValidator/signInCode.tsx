import { ZodSchema } from "zod";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

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
