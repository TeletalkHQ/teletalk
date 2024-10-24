import { BaseSchemaName } from "@repo/schema";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";

interface Props<Name extends BaseSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const Name = <Name extends BaseSchemaName>(props: Props<Name>) => (
	<FieldWithController
		hiddenLabel
		name="name"
		placeholder="Name"
		required
		{...props}
	/>
);
