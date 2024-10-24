import { BaseSchemaName } from "@repo/schema";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

type Props<Name extends BaseSchemaName> =
	FieldWithValidatorWithOptionalNameProps<Name>;

export const VerificationCode = <Name extends BaseSchemaName>(
	props: Props<Name>
) => {
	return (
		<FieldWithController
			autoFocus
			label="Verification Code"
			name="verificationCode"
			required
			{...props}
		/>
	);
};
