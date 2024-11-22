import { FormSchemaName } from "@repo/schema";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

interface Props<Name extends FormSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const Username = <Name extends FormSchemaName>(props: Props<Name>) => {
	return (
		<FieldWithController
			id="firstName"
			label="First Name"
			name="username"
			{...props}
		/>
	);
};
