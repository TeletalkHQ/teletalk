import { FormSchemaName } from "@repo/schema";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

interface Props<Name extends FormSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const SignInCode = <Name extends FormSchemaName>(props: Props<Name>) => {
	return (
		<FieldWithController
			id="signInCode"
			label="Sign In Code"
			name="signInCode"
			{...props}
		/>
	);
};
