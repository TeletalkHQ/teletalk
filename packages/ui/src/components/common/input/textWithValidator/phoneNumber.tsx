import { FormSchemaName } from "@repo/schema";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

interface Props<Name extends FormSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const PhoneNumber = <Name extends FormSchemaName>(
	props: Props<Name>
) => {
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
