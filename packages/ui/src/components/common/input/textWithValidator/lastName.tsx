import { FormSchemaName } from "@repo/schema";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

interface Props<Name extends FormSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const LastName = <Name extends FormSchemaName>(props: Props<Name>) => {
	return (
		<FieldWithController
			id="lastName"
			label="Last Name"
			name="lastName"
			{...props}
		/>
	);
};
