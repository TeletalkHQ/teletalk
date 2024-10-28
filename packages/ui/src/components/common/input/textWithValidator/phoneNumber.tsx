import { BaseSchemaName } from "@repo/schema";

import {
	FieldWithValidatorWithOptionalNameProps,
	TextField,
} from "../../../base";

interface Props<Name extends BaseSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const PhoneNumber = <Name extends BaseSchemaName>(
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
