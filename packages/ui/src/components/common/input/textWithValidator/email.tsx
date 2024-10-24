import { BaseSchemaName } from "@repo/schema";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

interface Props<Name extends BaseSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const Email = <Name extends BaseSchemaName>(props: Props<Name>) => (
	<FieldWithController
		hiddenLabel
		name="email"
		placeholder="Email"
		required
		{...props}
	/>
);
