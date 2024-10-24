import { BaseSchemaName } from "@repo/schema";

import { Field, FieldWithValidatorWithOptionalNameProps } from "../../../base";

interface Props<Name extends BaseSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const PhoneNumber = <Name extends BaseSchemaName>(
	props: Props<Name>
) => {
	return (
		<Field
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
