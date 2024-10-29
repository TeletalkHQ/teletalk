import { FormSchemaName } from "@repo/schema";

import {
	FieldWithValidatorWithOptionalNameProps,
	TextField,
} from "../../../base";

interface Props<Name extends FormSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const PhoneNumber = <Name extends FormSchemaName>(
	props: Props<Name>
) => {
	return (
		<TextField
			autoComplete="off"
			name="phoneNumber"
			placeholder="Phone Number"
			required
			style={{
				marginLeft: "5px",
			}}
			{...props}
		/>
	);
};
